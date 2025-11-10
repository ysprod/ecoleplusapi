import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Teacher } from './schemas/teacher.schema';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';
import { TeacherAssignmentRequestDto } from './dto/teacher-assignment.dto';
import { SchoolService } from '../school/school.service';
import { ClassService } from '../class/class.service';
import { UserService } from '../user/user.service';
import { ClassResponseDto } from 'src/class/dto/class-response.dto';
import { GradeResponseDto } from 'src/grade/dto/grade-response.dto';
import { SchoolResponseDto } from 'src/school/dto/school-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { PaginatedTeachersResponseDto } from './dto/paginated-teachers.dto';
import { ClassDetail } from 'src/class/dto/class-detail.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @Inject(forwardRef(() => SchoolService))
    private schoolService: SchoolService,
    @Inject(forwardRef(() => ClassService)) private classService: ClassService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  private mapToResponseDto(teacher: Teacher): TeacherResponseDto {
    return {
      id: teacher._id.toString(),
      user: teacher.user as unknown as UserResponseDto,
      matricule: teacher.matricule,
      lastName: teacher.lastName,
      firstName: teacher.firstName,
      fullName: `${teacher.firstName} ${teacher.lastName}`.trim(),
      email: teacher.email,
      gender: teacher.gender,
      phone: teacher.phone,
      birthDate: teacher.birthDate,
      subjects: teacher.subjects,
      classes: teacher.classes as unknown as ClassResponseDto[],
      schools: teacher.schools as unknown as SchoolResponseDto[],
      grades: teacher.grades as unknown as GradeResponseDto[],
      createdAt: teacher.createdAt!,
      updatedAt: teacher.updatedAt!,
    };
  }

  async create(
    createTeacherDto: CreateTeacherDto,
  ): Promise<TeacherResponseDto> {
    const existingTeacher = await this.teacherModel.findOne({
      matricule: createTeacherDto.matricule,
    });
    if (existingTeacher) {
      throw new ConflictException('Teacher with this matricule already exists');
    }

    const user = await this.userService.create({
      email:
        createTeacherDto.email || `${createTeacherDto.matricule}@school.com`,
      firstName: createTeacherDto.firstName,
      lastName: createTeacherDto.lastName,
      role: 'teacher',
      profileType: 'teacher',
      password:
        createTeacherDto.password ||
        createTeacherDto.matricule ||
        'changeme123',
    });

    const createdTeacher = new this.teacherModel({
      ...createTeacherDto,
      user: user.id,
    });

    const savedTeacher = await createdTeacher.save();
    return this.mapToResponseDto(savedTeacher);
  }

  async findAll(): Promise<TeacherResponseDto[]> {
    const teachers = await this.teacherModel
      .find()
      .populate('user classes schools grades')
      .exec();
    return teachers.map((teacher) => this.mapToResponseDto(teacher));
  }

  async findById(id: string): Promise<TeacherResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Teacher not found');
    }

    const teacher = await this.teacherModel
      .findById(id)
      .populate('user classes schools grades')
      .exec();

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.mapToResponseDto(teacher);
  }

  async findByMatricule(matricule: string): Promise<TeacherResponseDto> {
    const teacher = await this.teacherModel
      .findOne({ matricule })
      .populate('user classes schools grades')
      .exec();

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.mapToResponseDto(teacher);
  }

  /**
   * Recherche un enseignant à partir de l'identifiant utilisateur lié (champ `user`).
   */
  async findByUserId(userId: string): Promise<TeacherResponseDto> {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Teacher not found');
    }

    const teacher = await this.teacherModel
      .findOne({ user: userId })
      .populate('user schools grades')
      .populate({
        path: 'classes',
        populate: { path: 'school' },
      })
      .exec();

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.mapToResponseDto(teacher);
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Teacher not found');
    }

    const updatedTeacher = await this.teacherModel
      .findByIdAndUpdate(id, updateTeacherDto, { new: true })
      .populate('user classes schools grades')
      .exec();

    if (!updatedTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.mapToResponseDto(updatedTeacher);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Teacher not found');
    }

    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.userService.remove(teacher.user.toString());
    await this.teacherModel.findByIdAndDelete(id).exec();
  }

  async assignToClass(
    assignmentDto: TeacherAssignmentRequestDto,
  ): Promise<TeacherResponseDto> {
    const { teacherId, classId, schoolId } = assignmentDto;

    const teacher = await this.teacherModel.findById(teacherId);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.classService.addTeacherToClass(classId, teacherId);

    await this.teacherModel.findByIdAndUpdate(teacherId, {
      $addToSet: { classes: classId, schools: schoolId },
    });

    await this.schoolService.addTeacherIfNotExists(schoolId, teacherId);

    return this.findById(teacherId);
  }

  async updateSubjects(
    teacherId: string,
    subjects: string[],
  ): Promise<TeacherResponseDto> {
    if (!Types.ObjectId.isValid(teacherId)) {
      throw new NotFoundException('Teacher not found');
    }

    const updatedTeacher = await this.teacherModel
      .findByIdAndUpdate(teacherId, { subjects }, { new: true })
      .populate('user classes schools grades')
      .exec();

    if (!updatedTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.mapToResponseDto(updatedTeacher);
  }

  async getTeachersBySchool(
    schoolId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginatedTeachersResponseDto> {
    if (!Types.ObjectId.isValid(schoolId)) {
      throw new NotFoundException('School not found');
    }

    const skip = (page - 1) * limit;

    const [teachers, total] = await Promise.all([
      this.teacherModel
        .find({ schools: schoolId })
        .skip(skip)
        .limit(limit)
        .sort({ lastName: 1, firstName: 1 })
        .populate('user classes schools grades')
        .exec(),
      this.teacherModel.countDocuments({ schools: schoolId }),
    ]);

    return {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      teachers: teachers.map((teacher) => this.mapToResponseDto(teacher)),
    };
  }

  async getTeacherProfile(userId: string): Promise<TeacherResponseDto> {
    const teacher = await this.teacherModel
      .findOne({ user: userId })
      .populate({
        path: 'user',
        select: '-password',
      })
      .populate({
        path: 'classes',
        populate: [
          { path: 'school' },
          { path: 'students' },
          { path: 'educator' },
          { path: 'teachers' },
        ],
      })
      .populate('schools grades')
      .exec();

    if (!teacher) {
      throw new NotFoundException('Teacher profile not found');
    }

    return this.mapToResponseDto(teacher);
  }

  async getEducatorsByUserIds(
    userIds: string[],
  ): Promise<TeacherResponseDto[]> {
    if (!userIds || userIds.length === 0) return [];
    const teachers = await this.teacherModel
      .find({ user: { $in: userIds } })
      .populate('user classes schools grades')
      .exec();
    return teachers.map((teacher) => this.mapToResponseDto(teacher));
  }

  async assignTeacherToClass(
    data: TeacherAssignmentRequestDto,
  ): Promise<ClassDetail[]> {
    // Appelle le service d’assignation (à adapter selon ton architecture)
    // Recherche du teacher par matricule (string) ou par ObjectId
    const teacher: Teacher | null = await this.teacherModel.findOne({
      matricule: data.matricule,
    });

    if (!teacher) {
      throw new NotFoundException('Enseignant non trouvé');
    }

    await this.classService.addTeacherToClass(
      data.classId,
      teacher._id.toString(),
    );
    await this.schoolService.addTeacherIfNotExists(
      data.schoolId,
      teacher._id.toString(),
    );
    await this.teacherModel.findByIdAndUpdate(teacher._id, {
      $addToSet: { classes: data.classId, schools: data.schoolId },
    });

    return this.classService.getTeacherClasses(
      teacher._id.toString(),
      data.schoolId,
    );
  }
}
