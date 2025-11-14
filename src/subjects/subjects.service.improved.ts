import { 
  Injectable, 
  NotFoundException, 
  BadRequestException,
  ConflictException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto.new';
import { QuerySubjectDto } from './dto/query-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: Model<SubjectDocument>,
  ) {}

  /**
   * Créer une nouvelle matière
   */
  async create(
    createSubjectDto: CreateSubjectDto,
    userId: string
  ): Promise<SubjectDocument> {
    // Vérifier si le code existe déjà pour cette école et année
    const existingSubject = await this.subjectModel.findOne({
      school: createSubjectDto.school,
      academicYear: createSubjectDto.academicYear,
      code: createSubjectDto.code.toUpperCase()
    });

    if (existingSubject) {
      throw new ConflictException(
        `Une matière avec le code "${createSubjectDto.code}" existe déjà pour cette école et année académique`
      );
    }

    const subject = new this.subjectModel({
      ...createSubjectDto,
      code: createSubjectDto.code.toUpperCase(),
      createdBy: userId,
      classes: createSubjectDto.classes || []
    });

    return subject.save();
  }

  /**
   * Récupérer toutes les matières avec filtres
   */
  async findAll(queryDto: QuerySubjectDto): Promise<SubjectDocument[]> {
    const query = this.buildQuery(queryDto);

    return this.subjectModel
      .find(query)
      .populate('mainTeacher', 'firstName lastName email')
      .populate('classes', 'name level')
      .populate('school', 'nom')
      .populate('academicYear', 'name')
      .sort({ category: 1, name: 1 })
      .lean()
      .exec();
  }

  /**
   * Récupérer une matière par ID
   */
  async findOne(id: string): Promise<SubjectDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const subject = await this.subjectModel
      .findById(id)
      .populate('mainTeacher', 'firstName lastName email phone')
      .populate('classes', 'name level studentCount')
      .populate('school', 'nom localite')
      .populate('academicYear', 'name startDate endDate')
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName')
      .exec();

    if (!subject) {
      throw new NotFoundException(`Matière avec l'ID "${id}" non trouvée`);
    }

    return subject;
  }

  /**
   * Récupérer les matières par école
   */
  async findBySchool(
    schoolId: string,
    academicYearId: string
  ): Promise<SubjectDocument[]> {
    if (!Types.ObjectId.isValid(schoolId) || !Types.ObjectId.isValid(academicYearId)) {
      throw new BadRequestException('IDs invalides');
    }

    return this.subjectModel
      .find({
        school: schoolId,
        academicYear: academicYearId,
        isActive: true
      })
      .populate('mainTeacher', 'firstName lastName')
      .sort({ category: 1, name: 1 })
      .lean()
      .exec();
  }

  /**
   * Récupérer les matières par catégorie
   */
  async findByCategory(
    category: string,
    schoolId: string
  ): Promise<SubjectDocument[]> {
    if (!Types.ObjectId.isValid(schoolId)) {
      throw new BadRequestException('ID école invalide');
    }

    return this.subjectModel
      .find({
        category,
        school: schoolId,
        isActive: true
      })
      .populate('mainTeacher', 'firstName lastName')
      .sort({ name: 1 })
      .lean()
      .exec();
  }

  /**
   * Récupérer les matières d'un professeur
   */
  async findByTeacher(teacherId: string): Promise<SubjectDocument[]> {
    if (!Types.ObjectId.isValid(teacherId)) {
      throw new BadRequestException('ID professeur invalide');
    }

    return this.subjectModel
      .find({
        mainTeacher: teacherId,
        isActive: true
      })
      .populate('classes', 'name level')
      .populate('school', 'nom')
      .sort({ name: 1 })
      .lean()
      .exec();
  }

  /**
   * Récupérer les matières d'une classe
   */
  async findByClass(classId: string): Promise<SubjectDocument[]> {
    if (!Types.ObjectId.isValid(classId)) {
      throw new BadRequestException('ID classe invalide');
    }

    return this.subjectModel
      .find({
        classes: classId,
        isActive: true
      })
      .populate('mainTeacher', 'firstName lastName')
      .sort({ category: 1, name: 1 })
      .lean()
      .exec();
  }

  /**
   * Mettre à jour une matière
   */
  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
    userId: string
  ): Promise<SubjectDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const subject = await this.subjectModel.findById(id);
    if (!subject) {
      throw new NotFoundException(`Matière avec l'ID "${id}" non trouvée`);
    }

    // Vérifier si le code existe déjà (si code modifié)
    if (updateSubjectDto.code && updateSubjectDto.code !== subject.code) {
      const existing = await this.subjectModel.findOne({
        _id: { $ne: id },
        school: subject.school,
        academicYear: subject.academicYear,
        code: updateSubjectDto.code.toUpperCase()
      });

      if (existing) {
        throw new ConflictException(
          `Une matière avec le code "${updateSubjectDto.code}" existe déjà`
        );
      }
    }

    const updated = await this.subjectModel
      .findByIdAndUpdate(
        id,
        {
          ...updateSubjectDto,
          code: updateSubjectDto.code?.toUpperCase(),
          updatedBy: userId
        },
        { new: true, runValidators: true }
      )
      .populate('mainTeacher', 'firstName lastName')
      .populate('classes', 'name level')
      .exec();

    return updated!;
  }

  /**
   * Activer/Désactiver une matière
   */
  async toggleStatus(id: string, userId: string): Promise<SubjectDocument> {
    const subject = await this.findOne(id);
    subject.isActive = !subject.isActive;
    subject.updatedBy = new Types.ObjectId(userId);
    return subject.save();
  }

  /**
   * Affecter un professeur à une matière
   */
  async assignTeacher(
    id: string,
    teacherId: string,
    userId: string
  ): Promise<SubjectDocument> {
    if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(teacherId)) {
      throw new BadRequestException('IDs invalides');
    }

    const subject = await this.subjectModel
      .findByIdAndUpdate(
        id,
        {
          mainTeacher: teacherId,
          updatedBy: userId
        },
        { new: true }
      )
      .populate('mainTeacher', 'firstName lastName email')
      .exec();

    if (!subject) {
      throw new NotFoundException(`Matière avec l'ID "${id}" non trouvée`);
    }

    return subject;
  }

  /**
   * Affecter des classes à une matière
   */
  async assignClasses(
    id: string,
    classIds: string[],
    userId: string
  ): Promise<SubjectDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID matière invalide');
    }

    for (const classId of classIds) {
      if (!Types.ObjectId.isValid(classId)) {
        throw new BadRequestException(`ID classe invalide: ${classId}`);
      }
    }

    const subject = await this.subjectModel
      .findByIdAndUpdate(
        id,
        {
          classes: classIds,
          updatedBy: userId
        },
        { new: true }
      )
      .populate('classes', 'name level')
      .exec();

    if (!subject) {
      throw new NotFoundException(`Matière avec l'ID "${id}" non trouvée`);
    }

    return subject;
  }

  /**
   * Supprimer une matière
   */
  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }

    const subject = await this.findOne(id);

    // Vérifier si la matière peut être supprimée
    const hasGrades = await this.checkIfHasGrades(id);
    if (hasGrades) {
      throw new BadRequestException(
        'Impossible de supprimer cette matière car des notes y sont associées. Vous pouvez la désactiver à la place.'
      );
    }

    await this.subjectModel.findByIdAndDelete(id);

    return {
      message: `Matière "${subject.name}" supprimée avec succès`
    };
  }

  /**
   * Obtenir les statistiques des matières
   */
  async getStatistics(schoolId: string, academicYearId: string) {
    if (!Types.ObjectId.isValid(schoolId) || !Types.ObjectId.isValid(academicYearId)) {
      throw new BadRequestException('IDs invalides');
    }

    const subjects = await this.subjectModel.find({
      school: schoolId,
      academicYear: academicYearId
    }).lean();

    const stats = {
      total: subjects.length,
      active: subjects.filter(s => s.isActive).length,
      inactive: subjects.filter(s => !s.isActive).length,
      byCategory: {} as Record<string, number>,
      withTeacher: subjects.filter(s => s.mainTeacher).length,
      withoutTeacher: subjects.filter(s => !s.mainTeacher).length,
      totalClasses: subjects.reduce((sum, s) => sum + (s.classes?.length || 0), 0),
      averageCoefficient: 
        subjects.length > 0 
          ? subjects.reduce((sum, s) => sum + s.coefficient, 0) / subjects.length 
          : 0
    };

    // Statistiques par catégorie
    subjects.forEach(subject => {
      stats.byCategory[subject.category] = 
        (stats.byCategory[subject.category] || 0) + 1;
    });

    return stats;
  }

  /**
   * Méthodes privées
   */
  private buildQuery(queryDto: QuerySubjectDto) {
    const query: any = {};

    if (queryDto.school) query.school = queryDto.school;
    if (queryDto.academicYear) query.academicYear = queryDto.academicYear;
    if (queryDto.category) query.category = queryDto.category;
    if (queryDto.isActive !== undefined) query.isActive = queryDto.isActive;
    if (queryDto.mainTeacher) query.mainTeacher = queryDto.mainTeacher;
    if (queryDto.class) query.classes = queryDto.class;

    return query;
  }

  private async checkIfHasGrades(subjectId: string): Promise<boolean> {
    // TODO: Implémenter avec le service Grade ou injecter le GradeModel
    // Pour l'instant, on retourne false
    return false;
  }
}
