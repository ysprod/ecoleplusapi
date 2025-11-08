// src/grade/grade.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Grade, GradeDocument } from './schemas/grade.schema';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradeResponseDto } from './dto/grade-response.dto';
import { TeacherService } from '../teacher/teacher.service';
import { ClassResponseDto } from 'src/class/dto/class-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(Grade.name) private gradeModel: Model<GradeDocument>,
    private studentService: StudentsService,
    private teacherService: TeacherService,
  ) { }

  private async mapToResponseDto(grade: GradeDocument): Promise<GradeResponseDto> {
    await grade.populate([
      { path: 'student', select: '-password -refreshToken' },
      { path: 'teacher', select: '-password -refreshToken' },
      { path: 'subject' },
      { path: 'class' },
    ]);

    return {
      id: grade._id.toString(),
      student: grade.student as unknown as StudentResponseDto,
      teacher: grade.teacher as unknown as TeacherResponseDto,
      value: grade.value,
      type: grade.type,
      trimester: grade.trimester,
      comments: grade.comments,
      subject: grade.subject as unknown as SubjectResponseDto,
      class: grade.class as unknown as ClassResponseDto,
      createdAt: grade.createdAt!,
      updatedAt: grade.updatedAt!,
    };
  }

  async create(createGradeDto: CreateGradeDto): Promise<GradeResponseDto> {
    // Verify student exists
    await this.studentService.findById(createGradeDto.student);

    // Verify teacher exists
    await this.teacherService.findById(createGradeDto.teacher);

    const createdGrade = new this.gradeModel({
      ...createGradeDto,
      student: new Types.ObjectId(createGradeDto.student),
      teacher: new Types.ObjectId(createGradeDto.teacher),
      subject: createGradeDto.subject ? new Types.ObjectId(createGradeDto.subject) : undefined,
      class: createGradeDto.class ? new Types.ObjectId(createGradeDto.class) : undefined,
    });

    const savedGrade = await createdGrade.save();
    return this.mapToResponseDto(savedGrade);
  }

  async findByStudentId(studentId: string): Promise<GradeResponseDto[]> {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new NotFoundException('Student not found');
    }

    const grades = await this.gradeModel
      .find({ student: studentId })
      .populate([
        { path: 'student', select: '-password -refreshToken' },
        { path: 'teacher', select: '-password -refreshToken' },
        { path: 'subject' },
        { path: 'class' },
      ])
      .exec();

    return Promise.all(grades.map(grade => this.mapToResponseDto(grade)));
  }

  async deleteByStudentId(studentId: string): Promise<void> {
    if (!Types.ObjectId.isValid(studentId)) {
      throw new NotFoundException('Student not found');
    }

    await this.gradeModel.deleteMany({ student: studentId }).exec();
  }
}