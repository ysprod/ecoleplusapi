// src/class/class.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AcademicYearResponseDto } from 'src/academicyears/dto/academic-year-response.dto';
import { ScheduleResponseDto } from 'src/schedule/dto/ScheduleResponse.dto';
import { SchoolResponseDto } from 'src/school/dto/school-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { SchoolService } from '../school/school.service';
import { ClassResponseDto } from './dto/class-response.dto';
import { ClassStatisticsDto } from './dto/class-stats.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './schemas/class.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { ValidationService } from '../shared/validation.service';
import { ClassDetail } from './dto/class-detail.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @Inject(forwardRef(() => SchoolService))
    private schoolService: SchoolService,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}
  /**
   * Retourne les classes académiques filtrées pour le front-end
   */
  async getAcademicClasses2(
    schoolId: string,
    classType?: string,
    niveau?: string,
  ): Promise<any[]> {
    const filter: any = { school: schoolId };
    if (classType) filter.classType = classType;
    if (niveau) filter.level = niveau;
    const classes = await this.classModel
      .find(filter)
      .populate('school')
      .exec();
    // Adapte le mapping si besoin
    return classes;
  }

  async getSchoolForClass(classId: string): Promise<SchoolResponseDto | null> {
    if (!Types.ObjectId.isValid(classId)) return null;
    const classDoc = await this.classModel
      .findById(classId)
      .populate('school')
      .exec();
    if (!classDoc || !classDoc.school) return null;
    // Si besoin, adapte le mapping
    return classDoc.school as unknown as SchoolResponseDto;
  }

  async getStudentsForClass(classId: string): Promise<StudentResponseDto[]> {
    // Debug: vérifier si la classe existe
    const classDoc = await this.classModel.findById(classId).exec();
    if (!classDoc) {
      return [];
    }

    // Debug: chercher les étudiants manuellement pour voir le problème
    if (classDoc.students && classDoc.students.length > 0) {
      // Essayer de trouver les étudiants en cherchant par leur ID
      const studentsFromIds = await this.studentModel
        .find({
          _id: { $in: classDoc.students },
        })
        .exec();

      // Aussi chercher les étudiants qui ont cette classe comme référence
      const studentsWithClassRef = await this.studentModel
        .find({
          $or: [{ class: new Types.ObjectId(classId) }, { class: classId }],
        })
        .exec();
    }

    // Maintenant faire le populate normal
    const classDocPopulated = await this.classModel
      .findById(classId)
      .populate({ path: 'students', model: 'Student' })
      .exec();

    if (!classDocPopulated || !classDocPopulated.students) {
      return [];
    }

    const students =
      classDocPopulated.students as unknown as StudentResponseDto[];

    // Mapping explicite pour garantir le type
    return students;
  }

  /**
   * Retourne les enseignants d'une classe donnée
   */
  async getTeachersForClass(classId: string): Promise<TeacherResponseDto[]> {
    if (!Types.ObjectId.isValid(classId)) {
      throw new NotFoundException('Invalid class ID');
    }

    const classDoc = await this.classModel
      .findById(classId)
      .populate({
        path: 'teachers',
        model: 'Teacher',
        populate: [
          { path: 'subjects', model: 'Subject' },
          { path: 'schools', model: 'School' },
        ],
      })
      .exec();

    if (!classDoc) {
      throw new NotFoundException('Class not found');
    }

    if (!classDoc.teachers || classDoc.teachers.length === 0) {
      return [];
    }

    // Mapping des enseignants vers le DTO de réponse
    const teachers = classDoc.teachers as unknown as TeacherResponseDto[];
    return teachers;
  }

  async getAcademicClasses(
    schoolId: string,
    classType?: string,
    niveau?: string,
  ): Promise<any[]> {
    // Ajoute une vérification sur schoolId
    if (!schoolId) return [];

    // Filtre les classes selon les paramètres
    const query: any = { school: schoolId };
    if (classType) query.classType = classType;
    if (niveau) query.niveau = niveau;
    // Adapte selon ton ORM (ici Mongoose)
    const classes = await this.classModel.find(query).lean();

    // Toujours retourner un tableau, même vide
    return classes || [];
  }

  private mapToResponseDto(classDoc: Class): ClassResponseDto {
    return {
      id: classDoc._id.toString(),
      name: classDoc.name,
      level: classDoc.level,
      classType: classDoc.classType,
      school: classDoc.school as unknown as SchoolResponseDto,
      students: classDoc.students as unknown as StudentResponseDto[],
      schedules: classDoc.schedules as unknown as ScheduleResponseDto[],
      teachers: classDoc.teachers as unknown as TeacherResponseDto[],
      educator: classDoc.educator as unknown as UserResponseDto,
      academicYear: classDoc.academicYear as unknown as AcademicYearResponseDto,
      subjects: classDoc.subjects as unknown as SubjectResponseDto[],
      studentCount: classDoc['studentCount'], // Virtual property
      teacherCount: classDoc['teacherCount'], // Virtual property
      fullName: classDoc.getFullName(), // Method
      createdAt: classDoc.createdAt || new Date(),
      updatedAt: classDoc.updatedAt || new Date(),
    };
  }

  /**
   * Retourne les étudiants d'une école avec pagination
   */
  async getSchoolStudents(
    schoolId: string,
    options?: { page?: number; limit?: number; niveau?: string },
  ) {
    // Vérifie la validité de l'id
    if (!schoolId || !Types.ObjectId.isValid(schoolId)) {
      console.log('Invalid schoolId:', schoolId);
      return {
        students: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      };
    }
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    
    // Étape 1 : Trouver toutes les classes de cette école
    // Le champ school est stocké comme string dans la DB, pas comme ObjectId
    const classFilter: any = { school: schoolId };
    if (options?.niveau) {
      classFilter.level = options.niveau;
    }
    
    console.log('Class filter:', JSON.stringify(classFilter));
    
    const classes = await this.classModel.find(classFilter).select('_id').exec();
    const classIds = classes.map(c => c._id);
    
    console.log('Classes found for school:', classIds.length);
    console.log('Class IDs:', classIds);
    
    if (classIds.length === 0) {
      return {
        students: [],
        pagination: { page: 1, limit: limit, total: 0, pages: 0 },
      };
    }

    // Étape 2 : Trouver les étudiants de ces classes
    // Convertir les ObjectId en strings car le champ class est stocké comme string
    const classIdsAsStrings = classIds.map(id => id.toString());
    const query: any = { class: { $in: classIdsAsStrings } };

    console.log('Query for students:', JSON.stringify(query));
    
    // Debug: vérifier un étudiant pour voir le format de son champ class
    const sampleStudent = await this.studentModel.findOne({}).exec();
    if (sampleStudent) {
      console.log('Sample student class field:', sampleStudent.class, 'Type:', typeof sampleStudent.class);
    }
    
    // Compter le total
    const total = await this.studentModel.countDocuments(query);
    console.log('Total students found:', total);

    // Récupérer les étudiants avec pagination
    const studentsRaw = await this.studentModel
      .find(query)
      .populate({ path: 'class', model: 'Class' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    console.log('Students returned:', studentsRaw.length);

    // Le filtrage par niveau est déjà fait au niveau de la requête des classes
    const students = studentsRaw;

    return {
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async find(params?: {
    schoolId?: string;
    niveau?: string;
  }): Promise<ClassResponseDto[]> {
    const filter: any = {};

    if (params?.schoolId) {
      filter.school = params.schoolId;
    }
    if (params?.niveau) {
      filter.level = params.niveau;
    }

    const classes = await this.classModel
      .find(filter)
      .populate('school')
      .exec();

    return classes.map((cls) => this.mapToResponseDto(cls));
  }

  async create(createClassDto: CreateClassDto): Promise<ClassResponseDto> {
    // Check if class with same name exists in school
    const existingClass = await this.classModel.findOne({
      name: createClassDto.name,
      school: createClassDto.schoolId,
    });
    if (existingClass) {
      throw new ConflictException(
        'Class with this name already exists in this school',
      );
    }

    // Create fees object if provided
    const fees = {};
    if (createClassDto.tuitionFee !== undefined) {
      fees['tuition'] = { amount: createClassDto.tuitionFee, currency: 'FCFA' };
    }
    if (createClassDto.canteenFee !== undefined) {
      fees['canteen'] = { amount: createClassDto.canteenFee, currency: 'FCFA' };
    }
    if (createClassDto.transportFee !== undefined) {
      fees['transport'] = {
        amount: createClassDto.transportFee,
        currency: 'FCFA',
      };
    }
    if (createClassDto.activitiesFee !== undefined) {
      fees['activities'] = {
        amount: createClassDto.activitiesFee,
        currency: 'FCFA',
      };
    }

    const createdClass = new this.classModel({
      ...createClassDto,
      school: createClassDto.schoolId,
      fees,
      createdBy: createClassDto.user,
    });

    const savedClass = await createdClass.save();

    // Add class to school
    await this.schoolService.addClass(
      createClassDto.schoolId,
      savedClass._id.toString(),
    );

    return this.mapToResponseDto(savedClass);
  }

  async findAll(): Promise<ClassResponseDto[]> {
    const classes = await this.classModel.find().populate('school').exec();
    return classes.map((cls) => this.mapToResponseDto(cls));
  }

  async findById(id: string): Promise<ClassResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Class not found');
    }

    const classDoc = await this.classModel
      .findById(id)
      .populate('school students teachers educator academicYear subjects')
      .exec();

    if (!classDoc) {
      throw new NotFoundException('Class not found');
    }

    return this.mapToResponseDto(classDoc);
  }

  async findBySchool(schoolId: string): Promise<ClassResponseDto[]> {
    const classes = await this.classModel
      .find({ school: schoolId })
      .populate('school')
      .exec();
    return classes.map((cls) => this.mapToResponseDto(cls));
  }

  async findBySchoolAndLevel(
    schoolId: string,
    level: string,
  ): Promise<ClassResponseDto[]> {
    const classes = await this.classModel
      .find({ school: schoolId, level })
      .populate('school')
      .exec();
    return classes.map((cls) => this.mapToResponseDto(cls));
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
    userId: string,
  ): Promise<ClassResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Class not found');
    }

    const updatedClass = await this.classModel
      .findByIdAndUpdate(
        id,
        { ...updateClassDto, updatedBy: userId },
        { new: true },
      )
      .populate('school students teachers educator academicYear subjects')
      .exec();

    if (!updatedClass) {
      throw new NotFoundException('Class not found');
    }

    return this.mapToResponseDto(updatedClass);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Class not found');
    }

    const result = await this.classModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Class not found');
    }
  }

  async addStudent(
    classId: string,
    studentId: string,
  ): Promise<ClassResponseDto> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(studentId)
    ) {
      throw new NotFoundException('Class or student not found');
    }

    const updatedClass = await this.classModel
      .findByIdAndUpdate(
        classId,
        { $addToSet: { students: studentId } },
        { new: true },
      )
      .populate('school students teachers educator academicYear subjects')
      .exec();

    if (!updatedClass) {
      throw new NotFoundException('Class not found');
    }

    return this.mapToResponseDto(updatedClass);
  }

  /**
   * Ajoute un enseignant à une classe (si non déjà présent)
   */
  async addTeacherToClass(classId: string, teacherId: string): Promise<void> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(teacherId)
    ) {
      throw new NotFoundException('Class or Teacher not found');
    }
    await this.classModel.findByIdAndUpdate(
      classId,
      { $addToSet: { teachers: teacherId } },
      { new: true },
    );
  }

  async assignEducator(
    classId: string,
    educatorId: string,
  ): Promise<ClassResponseDto> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(educatorId)
    ) {
      throw new NotFoundException('Class or educator not found');
    }

    const updatedClass = await this.classModel
      .findByIdAndUpdate(classId, { educator: educatorId }, { new: true })
      .populate('school students teachers educator academicYear subjects')
      .exec();

    if (!updatedClass) {
      throw new NotFoundException('Class not found');
    }

    return this.mapToResponseDto(updatedClass);
  }

  async getClassStats(schoolId?: string): Promise<ClassStatisticsDto> {
    const matchStage = schoolId
      ? { $match: { school: new Types.ObjectId(schoolId) } }
      : { $match: {} };

    const stats = await this.classModel.aggregate([
      matchStage,
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalClasses: { $sum: 1 },
                avgStudents: { $avg: { $size: '$students' } },
                totalStudents: { $sum: { $size: '$students' } },
                totalTeachers: { $sum: { $size: '$teachers' } },
              },
            },
          ],
          byLevel: [
            {
              $group: {
                _id: '$level',
                count: { $sum: 1 },
                withEducator: {
                  $sum: { $cond: [{ $ifNull: ['$educator', false] }, 1, 0] },
                },
              },
            },
          ],
          byClassType: [
            {
              $group: {
                _id: '$classType',
                count: { $sum: 1 },
              },
            },
          ],
          creationTrend: [
            {
              $group: {
                _id: {
                  $dateToString: { format: '%Y-%m', date: '$createdAt' },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
      {
        $project: {
          summary: { $arrayElemAt: ['$summary', 0] },
          byLevel: 1,
          byClassType: 1,
          creationTrend: 1,
        },
      },
    ]);

    return this.mapStatsResult(stats[0]);
  }

  private mapStatsResult(result: any): ClassStatisticsDto {
    return {
      summary: {
        totalClasses: result.summary?.totalClasses || 0,
        avgStudents: result.summary?.avgStudents || 0,
        totalStudents: result.summary?.totalStudents || 0,
        totalTeachers: result.summary?.totalTeachers || 0,
      },
      byLevel:
        result.byLevel?.map((item: any) => ({
          level: item._id,
          count: item.count,
          withEducator: item.withEducator,
        })) || [],
      byClassType:
        result.byClassType?.map((item: any) => ({
          classType: item._id,
          count: item.count,
        })) || [],
      topSchools: [],
      creationTrend:
        result.creationTrend?.map((item: any) => ({
          month: item._id,
          count: item.count,
        })) || [],
    };
  }

  /**
   * Retire un élève d'une classe
   */
  async removeStudent(classId: string, studentId: string): Promise<void> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(studentId)
    ) {
      throw new NotFoundException('Class or Student not found');
    }
    await this.classModel.findByIdAndUpdate(classId, {
      $pull: { students: new Types.ObjectId(studentId) },
    });
  }

  /**
   * Ajoute un enseignant à la classe (sans doublon)
   */
  async addTeacher(
    classId: string,
    teacherId: string,
  ): Promise<ClassResponseDto> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(teacherId)
    ) {
      throw new NotFoundException('Class or Teacher not found');
    }
    const updatedClass = await this.classModel
      .findByIdAndUpdate(
        classId,
        { $addToSet: { teachers: new Types.ObjectId(teacherId) } },
        { new: true },
      )
      .populate('teachers');
    if (!updatedClass) {
      throw new NotFoundException('Class not found');
    }
    // Adapte ce mapping selon ta logique
    return {
      id: updatedClass._id.toString(),
      name: updatedClass.name,
      level: updatedClass.level,
      school: updatedClass.school,
      teachers: updatedClass.teachers,
      students: updatedClass.students,
      createdAt: updatedClass.createdAt,
      updatedAt: updatedClass.updatedAt,
    } as unknown as ClassResponseDto;
  }

  /**
   * Ajoute des matières à une classe (sans doublons)
   */
  async addSubjectsToClass(classId: string, subjectIds: string[]): Promise<void> {
    if (!Types.ObjectId.isValid(classId)) {
      throw new NotFoundException('Class not found');
    }
    if (!subjectIds || subjectIds.length === 0) return;
    await this.classModel.findByIdAndUpdate(
      classId,
      { $addToSet: { subjects: { $each: subjectIds.map((id) => new Types.ObjectId(id)) } } },
      { new: true },
    );
  }

  /**
   * Retourne les classes d'un enseignant, éventuellement filtrées par école
   */
  async getTeacherClasses(
    teacherId: string,
    schoolId?: string,
  ): Promise<ClassDetail[]> {
    ValidationService.validateObjectId(teacherId);

    const query: any = { teachers: teacherId };
    if (schoolId) {
      query.school = schoolId;
    }

    const classes = await this.classModel
      .find(query)
      .select('name level school')
      .populate({
        path: 'school',
        select: '_id name nom',
      })
      .lean()
      .exec();

    return classes.map((cls) => ({
      _id: cls._id?.toString(),
      name: cls.name,
      level: cls.level,
      school: cls.school
        ? {
            _id: cls.school._id?.toString(),
            // name: cls.school.name,
            // nom: cls.school.nom,
          }
        : undefined,
    })) as ClassDetail[];
  }
}
