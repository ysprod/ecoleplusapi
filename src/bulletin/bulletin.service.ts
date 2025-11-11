import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Bulletin,
  BulletinDocument,
  BulletinStatus,
} from './schemas/bulletin.schema';
import { Grade, GradeDocument } from '../grade/schemas/grade.schema';
import { Conduct, ConductDocument } from '../conduct/schemas/conduct.schema';
import { Remark, RemarkDocument } from '../remark/schemas/remark.schema';
import { Subject } from '../subject/schemas/subject.schema';
import { CreateBulletinDto } from './dto/create-bulletin.dto';
import { UpdateBulletinDto } from './dto/update-bulletin.dto';
import { BulletinResponseDto } from './dto/bulletin-response.dto';
import {
  ArchiveBulletinDto,
  GenerateBulletinDto,
  PublishBulletinDto,
} from './dto/actions.dto';

@Injectable()
export class BulletinService {
  constructor(
    @InjectModel(Bulletin.name) private bulletinModel: Model<BulletinDocument>,
    @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
    @InjectModel(Conduct.name) private conductModel: Model<ConductDocument>,
    @InjectModel(Remark.name) private remarkModel: Model<RemarkDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {}

  private map(doc: BulletinDocument): BulletinResponseDto {
    return {
      id: doc._id.toString(),
      student: doc.student.toString(),
      class: doc.class.toString(),
      term: doc.term.toString(),
      academicYear: doc.academicYear.toString(),
      school: doc.school.toString(),
      grades: (doc.grades || []).map((g) => ({
        subject: g.subject.toString(),
        coefficient: g.coefficient,
        interrogation: g.interrogation,
        devoir: g.devoir,
        composition: g.composition,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher?.toString(),
        teacherName: g.teacherName,
      })),
      statistics: {
        generalAverage: doc.statistics.generalAverage,
        classAverage: doc.statistics.classAverage,
        rank: doc.statistics.rank,
        totalStudents: doc.statistics.totalStudents,
        highestAverage: doc.statistics.highestAverage,
        lowestAverage: doc.statistics.lowestAverage,
        totalCoefficients: doc.statistics.totalCoefficients,
      },
      conduct: doc.conduct?.toString(),
      remarks: doc.remarks?.map((r) => r.toString()),
      decision: doc.decision,
      status: doc.status,
      generatedAt: doc.generatedAt,
      publishedAt: doc.publishedAt,
      generatedBy: doc.generatedBy?.toString(),
      publishedBy: doc.publishedBy?.toString(),
      pdfUrl: doc.pdfUrl,
      parentNotified: doc.parentNotified,
      parentNotifiedAt: doc.parentNotifiedAt,
      downloaded: doc.downloaded,
      downloadedAt: doc.downloadedAt,
      createdAt: doc.createdAt!,
      updatedAt: doc.updatedAt!,
    };
  }

  async create(dto: CreateBulletinDto): Promise<BulletinResponseDto> {
    const created = new this.bulletinModel({
      ...dto,
      student: new Types.ObjectId(dto.student),
      class: new Types.ObjectId(dto.class),
      term: new Types.ObjectId(dto.term),
      academicYear: new Types.ObjectId(dto.academicYear),
      school: new Types.ObjectId(dto.school),
      grades: dto.grades.map((g) => ({
        subject: new Types.ObjectId(g.subject),
        coefficient: g.coefficient,
        interrogation: g.interrogation ?? 0,
        devoir: g.devoir ?? 0,
        composition: g.composition ?? 0,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher ? new Types.ObjectId(g.teacher) : undefined,
        teacherName: g.teacherName,
      })),
      statistics: dto.statistics,
      conduct: dto.conduct ? new Types.ObjectId(dto.conduct) : undefined,
      remarks: dto.remarks?.map((r) => new Types.ObjectId(r)),
    });
    const saved = await created.save();
    return this.map(saved);
  }

  async findById(id: string): Promise<BulletinResponseDto> {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Bulletin not found');
    const doc = await this.bulletinModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async findByStudentAndTerm(
    studentId: string,
    termId: string,
  ): Promise<BulletinResponseDto | null> {
    const doc = await this.bulletinModel
      .findOne({ student: studentId, term: termId })
      .exec();
    return doc ? this.map(doc) : null;
  }

  async findByClassAndTerm(
    classId: string,
    termId: string,
  ): Promise<BulletinResponseDto[]> {
    const docs = await this.bulletinModel
      .find({ class: classId, term: termId })
      .exec();
    return docs.map((d) => this.map(d));
  }

  async update(
    id: string,
    dto: UpdateBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = { ...dto };
    if (dto.student) update.student = new Types.ObjectId(dto.student);
    if (dto.class) update.class = new Types.ObjectId(dto.class);
    if (dto.term) update.term = new Types.ObjectId(dto.term);
    if (dto.academicYear)
      update.academicYear = new Types.ObjectId(dto.academicYear);
    if (dto.school) update.school = new Types.ObjectId(dto.school);
    if (dto.conduct) update.conduct = new Types.ObjectId(dto.conduct);
    if (dto.remarks)
      update.remarks = dto.remarks.map((r) => new Types.ObjectId(r));
    if (dto.grades)
      update.grades = dto.grades.map((g) => ({
        subject: new Types.ObjectId(g.subject),
        coefficient: g.coefficient,
        interrogation: g.interrogation ?? 0,
        devoir: g.devoir ?? 0,
        composition: g.composition ?? 0,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher ? new Types.ObjectId(g.teacher) : undefined,
        teacherName: g.teacherName,
      }));

    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async remove(id: string): Promise<void> {
    const res = await this.bulletinModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Bulletin not found');
  }

  async generate(
    id: string,
    dto: GenerateBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = {
      status: BulletinStatus.GENERATED,
      generatedAt: new Date(),
    };
    if (dto.generatedBy)
      update.generatedBy = new Types.ObjectId(dto.generatedBy);
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async publish(
    id: string,
    dto: PublishBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = {
      status: BulletinStatus.PUBLISHED,
      publishedAt: new Date(),
    };
    if (dto.publishedBy)
      update.publishedBy = new Types.ObjectId(dto.publishedBy);
    if (dto.pdfUrl) update.pdfUrl = dto.pdfUrl;
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async archive(
    id: string,
    _dto: ArchiveBulletinDto,
  ): Promise<BulletinResponseDto> {
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, { status: BulletinStatus.ARCHIVED }, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async generateBulletin(
    studentId: Types.ObjectId,
    termId: Types.ObjectId,
    classId: Types.ObjectId,
  ): Promise<BulletinDocument> {
    // 1. Récupérer toutes les notes de l'élève pour ce trimestre
    const grades = await this.gradeModel
      .find({
        student: studentId,
        term: termId,
        status: 'VALIDATED',
      })
      .populate('subject teacher')
      .exec();

    // 2. Grouper les notes par matière et calculer les moyennes
    const gradesBySubject = this.calculateGradesBySubject(grades);

    // 3. Calculer les statistiques de classe
    const classStatistics = await this.calculateClassStatistics(
      classId,
      termId,
      gradesBySubject,
    );

    // 4. Récupérer la conduite
    const conduct = await this.conductModel
      .findOne({ student: studentId, term: termId })
      .exec();

    // 5. Récupérer les observations
    const remarks = await this.remarkModel
      .find({ student: studentId, term: termId })
      .exec();

    // 6. Déterminer la décision
    const decision = this.determineDecision(
      classStatistics.generalAverage,
      conduct,
    );

    // 7. Créer le bulletin
    const bulletin = new this.bulletinModel({
      student: studentId,
      class: classId,
      term: termId,
      grades: gradesBySubject,
      statistics: classStatistics,
      conduct: conduct?._id,
      remarks: remarks.map((r) => r._id),
      decision,
      status: 'GENERATED',
      generatedAt: new Date(),
    });

    return await bulletin.save();
  }

  private calculateGradesBySubject(grades: any[]): any[] {
    const subjectMap = new Map();

    grades.forEach((grade) => {
      const subjectId = grade.subject._id.toString();

      if (!subjectMap.has(subjectId)) {
        subjectMap.set(subjectId, {
          subject: grade.subject._id,
          coefficient: grade.subject.coefficient,
          interrogation: 0,
          devoir: 0,
          composition: 0,
          teacher: grade.teacher?._id,
          teacherName: grade.teacher?.fullName,
          grades: [],
        });
      }

      const subjectData = subjectMap.get(subjectId);
      subjectData.grades.push(grade);

      // Répartir les notes selon le type
      if (grade.type === 'INTERROGATION') {
        subjectData.interrogation = grade.value;
      } else if (grade.type === 'DEVOIR') {
        subjectData.devoir = grade.value;
      } else if (grade.type === 'COMPOSITION') {
        subjectData.composition = grade.value;
      }
    });

    // Calculer la moyenne par matière
    return Array.from(subjectMap.values()).map((subject) => {
      const moyenne =
        subject.interrogation * 0.2 +
        subject.devoir * 0.3 +
        subject.composition * 0.5;

      return {
        ...subject,
        moyenne: parseFloat(moyenne.toFixed(2)),
        appreciation: this.getAppreciation(moyenne),
        grades: undefined, // Ne pas inclure dans le bulletin final
      };
    });
  }

  private async calculateClassStatistics(
    classId: Types.ObjectId,
    termId: Types.ObjectId,
    studentGrades: any[],
  ): Promise<any> {
    // Récupérer toutes les notes de la classe
    const allClassGrades = await this.gradeModel
      .find({ class: classId, term: termId, status: 'VALIDATED' })
      .populate('student')
      .exec();

    // Calculer la moyenne générale de l'élève
    const totalWeighted = studentGrades.reduce(
      (sum, g) => sum + g.moyenne * g.coefficient,
      0,
    );
    const totalCoefficients = studentGrades.reduce(
      (sum, g) => sum + g.coefficient,
      0,
    );
    const generalAverage = totalWeighted / totalCoefficients;

    // Calculer les statistiques de classe
    // (Implémentation simplifiée - à adapter selon vos besoins)
    const classAverage = 12.5; // À calculer réellement
    const rank = 4; // À calculer réellement
    const totalStudents = 45; // À calculer réellement
    const highestAverage = 18.5; // À calculer réellement
    const lowestAverage = 8.2; // À calculer réellement

    return {
      generalAverage: parseFloat(generalAverage.toFixed(2)),
      classAverage,
      rank,
      totalStudents,
      highestAverage,
      lowestAverage,
      totalCoefficients,
    };
  }

  private getAppreciation(moyenne: number): string {
    if (moyenne >= 18) return 'Excellent travail, continuez ainsi';
    if (moyenne >= 16) return 'Très bien, bon niveau';
    if (moyenne >= 14) return 'Bien, continuez vos efforts';
    if (moyenne >= 12) return 'Assez bien, peut mieux faire';
    if (moyenne >= 10) return 'Passable, travail insuffisant';
    return "Insuffisant, redoublez d'efforts";
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
