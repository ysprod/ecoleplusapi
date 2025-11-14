import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bulletin, BulletinDocument, BulletinStatus } from './schemas/bulletin.schema';
import { Grade, GradeDocument } from '../grade/schemas/grade.schema';
import { Conduct, ConductDocument } from '../conduct/schemas/conduct.schema';
import { Remark, RemarkDocument } from '../remark/schemas/remark.schema';
 import { Term, TermDocument } from '../term/schemas/term.schema';
import { Subject, SubjectDocument } from 'src/subjects/schemas/subject.schema';
import { Student, StudentDocument } from 'src/students/schemas/student.schema';
 
 

@Injectable()
export class BulletinServiceAuto {
  constructor(
    @InjectModel(Bulletin.name) private bulletinModel: Model<BulletinDocument>,
    @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
    @InjectModel(Conduct.name) private conductModel: Model<ConductDocument>,
    @InjectModel(Remark.name) private remarkModel: Model<RemarkDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
    @InjectModel(Term.name) private termModel: Model<TermDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  /**
   * Vérifie si toutes les conditions sont remplies pour générer le bulletin
   */
  async canGenerateBulletin(
    studentId: Types.ObjectId,
    termId: Types.ObjectId,
  ): Promise<{ canGenerate: boolean; missing: string[] }> {
    const missing: string[] = [];

    // 1. Vérifier que le trimestre est terminé
    const term = await this.termModel.findById(termId);
    if (!term || term.status !== 'CLOSED') {
      missing.push('Le trimestre doit être clôturé');
    }

    // 2. Vérifier que toutes les notes sont saisies
    const student = await this.studentModel.findById(studentId).populate('class');
    if (!student || !student.class) {
      missing.push('Élève ou classe introuvable');
      return { canGenerate: false, missing };
    }
    
    const subjects = await this.subjectModel.find({
      classes: student.class._id,
      academicYear: term!.academicYear,
    });

    for (const subject of subjects) {
      const grades = await this.gradeModel.find({
        student: studentId,
        subject: subject._id,
        term: termId,
        status: 'VALIDATED',
      });

      const hasInterrogation = grades.some(g => g.type === 'INTERROGATION');
      const hasDevoir = grades.some(g => g.type === 'DEVOIR');
      const hasComposition = grades.some(g => g.type === 'COMPOSITION');

      if (!hasInterrogation || !hasDevoir || !hasComposition) {
        missing.push(`Notes incomplètes pour ${subject.name}`);
      }
    }

    // 3. Vérifier la conduite
    const conduct = await this.conductModel.findOne({
      student: studentId,
      term: termId,
    });
    if (!conduct) {
      missing.push('Fiche de conduite non remplie');
    }

    // 4. Vérifier les observations
    const remarks = await this.remarkModel.find({
      student: studentId,
      term: termId,
    });
    const hasTeacherRemark = remarks.some(r => r.type === 'TEACHER');
    const hasCouncilRemark = remarks.some(r => r.type === 'COUNCIL');
    const hasPrincipalRemark = remarks.some(r => r.type === 'PRINCIPAL');

    if (!hasTeacherRemark) missing.push('Observation du professeur principal manquante');
    if (!hasCouncilRemark) missing.push('Observation du conseil de classe manquante');
    if (!hasPrincipalRemark) missing.push('Observation du chef d\'établissement manquante');

    return {
      canGenerate: missing.length === 0,
      missing,
    };
  }

  /**
   * Génère le bulletin pour un élève et un trimestre
   */
  async generateBulletin(
    studentId: Types.ObjectId,
    termId: Types.ObjectId,
    userId: Types.ObjectId, // Utilisateur qui génère
  ): Promise<BulletinDocument> {
    // Vérifier les prérequis
    const { canGenerate, missing } = await this.canGenerateBulletin(studentId, termId);
    if (!canGenerate) {
      throw new BadRequestException(
        `Impossible de générer le bulletin. Éléments manquants : ${missing.join(', ')}`,
      );
    }

    // Vérifier si le bulletin existe déjà
    const existingBulletin = await this.bulletinModel.findOne({
      student: studentId,
      term: termId,
    });

    if (existingBulletin) {
      throw new BadRequestException('Le bulletin existe déjà pour cet élève et ce trimestre');
    }

    const student = await this.studentModel.findById(studentId).populate('class');
    const term = await this.termModel.findById(termId);

    if (!student || !student.class) {
      throw new BadRequestException('Élève ou classe introuvable');
    }
    if (!term) {
      throw new BadRequestException('Trimestre introuvable');
    }

    // 1. Récupérer et calculer les notes
    const gradesBySubject = await this.calculateGradesBySubject(studentId, termId);

    // 2. Calculer les statistiques de classe
    const statistics = await this.calculateClassStatistics(
      student.class._id,
      termId,
      studentId,
    );

    // 3. Récupérer la conduite
    const conduct = await this.conductModel.findOne({
      student: studentId,
      term: termId,
    });

    // 4. Récupérer les observations
    const remarks = await this.remarkModel.find({
      student: studentId,
      term: termId,
    });

    // 5. Déterminer la décision
    const decision = this.determineDecision(statistics.generalAverage, conduct);

    // 6. Créer le bulletin
    const bulletin = new this.bulletinModel({
      student: studentId,
      class: student.class._id,
      term: termId,
      academicYear: term.academicYear,
      school: term.school,
      grades: gradesBySubject,
      statistics,
      conduct: conduct!._id,
      remarks: remarks.map(r => r._id),
      decision,
      status: 'GENERATED',
      generatedAt: new Date(),
      generatedBy: userId,
    });

    const savedBulletin = await bulletin.save();

    // 7. Mettre à jour le trimestre
    await this.termModel.findByIdAndUpdate(termId, {
      bulletinsGenerated: true,
    });

    return savedBulletin;
  }

  /**
   * Génère tous les bulletins d'une classe pour un trimestre
   */
  async generateClassBulletins(
    classId: Types.ObjectId,
    termId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<{ success: number; failed: number; errors: any[] }> {
    const students = await this.studentModel.find({ class: classId });
    
    let success = 0;
    let failed = 0;
    const errors: any[] = [];

    for (const student of students) {
      try {
        await this.generateBulletin(student._id, termId, userId);
        success++;
      } catch (error) {
        failed++;
        errors.push({
          studentId: student._id,
          studentName: `${student.firstName} ${student.lastName}`,
          error: error.message,
        });
      }
    }

    return { success, failed, errors };
  }

  /**
   * Publie un bulletin (le rend accessible aux parents)
   */
  async publishBulletin(bulletinId: Types.ObjectId, userId: Types.ObjectId): Promise<BulletinDocument> {
    const bulletin = await this.bulletinModel.findById(bulletinId);
    
    if (!bulletin) {
      throw new BadRequestException('Bulletin non trouvé');
    }

    if (bulletin.status === 'PUBLISHED') {
      throw new BadRequestException('Le bulletin est déjà publié');
    }

   bulletin.status = BulletinStatus.PUBLISHED;
    bulletin.publishedAt = new Date();
    bulletin.publishedBy = userId;

    await bulletin.save();

    // TODO: Envoyer notification aux parents
    // await this.notificationService.notifyParents(bulletin);

    return bulletin;
  }

  /**
   * Calcule les notes par matière
   */
  private async calculateGradesBySubject(
    studentId: Types.ObjectId,
    termId: Types.ObjectId,
  ): Promise<any[]> {
    const grades = await this.gradeModel
      .find({
        student: studentId,
        term: termId,
        status: 'VALIDATED',
      })
      .populate('subject teacher')
      .exec();

    // Grouper par matière
    const subjectMap = new Map();

    for (const grade of grades) {
      const subjectId = grade.subject._id.toString();

      if (!subjectMap.has(subjectId)) {
        subjectMap.set(subjectId, {
          subject: grade.subject._id,
        //   coefficient: grade.subject.coefficient,
          interrogation: 0,
          devoir: 0,
          composition: 0,
          teacher: grade.teacher?._id,
        //   teacherName: grade.teacher?.fullName,
        });
      }

      const subjectData = subjectMap.get(subjectId);

      if (grade.type === 'INTERROGATION') {
        subjectData.interrogation = grade.value;
      } else if (grade.type === 'DEVOIR') {
        subjectData.devoir = grade.value;
      } else if (grade.type === 'COMPOSITION') {
        subjectData.composition = grade.value;
      }
    }

    // Calculer les moyennes
    return Array.from(subjectMap.values()).map((subject) => {
      const moyenne =
        subject.interrogation * 0.2 +
        subject.devoir * 0.3 +
        subject.composition * 0.5;

      return {
        ...subject,
        moyenne: parseFloat(moyenne.toFixed(2)),
        appreciation: this.getAppreciation(moyenne),
      };
    });
  }

  /**
   * Calcule les statistiques de classe
   */
  private async calculateClassStatistics(
    classId: Types.ObjectId,
    termId: Types.ObjectId,
    studentId: Types.ObjectId,
  ): Promise<any> {
    // Récupérer tous les élèves de la classe
    const students = await this.studentModel.find({ class: classId });
    
    // Calculer la moyenne de chaque élève
    const averages: { studentId: string; average: number }[] = [];

    for (const student of students) {
      const gradesBySubject = await this.calculateGradesBySubject(student._id, termId);
      
      const totalWeighted = gradesBySubject.reduce(
        (sum, g) => sum + g.moyenne * g.coefficient,
        0,
      );
      const totalCoefficients = gradesBySubject.reduce(
        (sum, g) => sum + g.coefficient,
        0,
      );

      if (totalCoefficients > 0) {
        averages.push({
          studentId: student._id.toString(),
          average: totalWeighted / totalCoefficients,
        });
      }
    }

    // Trier par moyenne décroissante
    averages.sort((a, b) => b.average - a.average);

    // Trouver le rang de l'élève
    const studentRank = averages.findIndex(
      a => a.studentId === studentId.toString()
    ) + 1;

    // Calculer les statistiques
    const studentAverage = averages.find(
      a => a.studentId === studentId.toString()
    )?.average || 0;

    const classAverage =
      averages.reduce((sum, a) => sum + a.average, 0) / averages.length;

    const highestAverage = averages[0]?.average || 0;
    const lowestAverage = averages[averages.length - 1]?.average || 0;

    return {
      generalAverage: parseFloat(studentAverage.toFixed(2)),
      classAverage: parseFloat(classAverage.toFixed(2)),
      rank: studentRank,
      totalStudents: students.length,
      highestAverage: parseFloat(highestAverage.toFixed(2)),
      lowestAverage: parseFloat(lowestAverage.toFixed(2)),
      totalCoefficients: 0, // À calculer
    };
  }

  private getAppreciation(moyenne: number): string {
    if (moyenne >= 18) return 'Excellent travail, continuez ainsi';
    if (moyenne >= 16) return 'Très bien, bon niveau';
    if (moyenne >= 14) return 'Bien, continuez vos efforts';
    if (moyenne >= 12) return 'Assez bien, peut mieux faire';
    if (moyenne >= 10) return 'Passable, travail insuffisant';
    return 'Insuffisant, redoublez d\'efforts';
  }

  private determineDecision(generalAverage: number, conduct: any): string {
    if (generalAverage >= 18 && conduct?.discipline === 'EXCELLENT') {
      return 'FELICITATIONS';
    }
    if (generalAverage >= 16) return 'TABLEAU_HONNEUR';
    if (generalAverage >= 14) return 'ENCOURAGEMENTS';
    if (generalAverage >= 10) return 'ADMIS';
    return 'REDOUBLE';
  }
}

