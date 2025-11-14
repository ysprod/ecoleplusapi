import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { ClassService } from '../class/class.service';
import { PaginatedStudentsResponseDto } from './dto/paginated-students.dto';
import { ClassResponseDto } from '../class/dto/class-response.dto';
import { GradeResponseDto } from '../grade/dto/grade-response.dto';
import { PaymentResponseDto } from '../payment/dto/payment-response.dto';
import { ParentResponseDto } from '../parent/dto/parent-response.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    private classService: ClassService,
  ) {}

  private async mapToResponseDto(
    student: StudentDocument,
  ): Promise<StudentResponseDto> {
    await student.populate([
      { path: 'class' },
      { path: 'parents' },
      { path: 'grades' },
      { path: 'payments' },
    ]);

    return {
      id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      fullName: `${student.firstName} ${student.lastName}`,
      birthDate: student.birthDate,
      age: student['age'],
      birthPlace: student.birthPlace,
      email: student.email,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      parentContact: student.parentContact,
      class: student.class as unknown as ClassResponseDto,
      classLevel: student.classLevel,
      photoUrl: student.photoUrl,
      healthNotes: student.healthNotes,
      healthIssues: student.healthIssues,
      forbiddenFoods: student.forbiddenFoods,
      parents: student.parents as unknown as ParentResponseDto[],
      grades: student.grades as unknown as GradeResponseDto[],
      payments: student.payments as unknown as PaymentResponseDto[],
      matricule: student.matricule,
      createdAt: student.createdAt!,
      updatedAt: student.updatedAt!,
    };
  }

  async create(
    createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    const matricule =
      createStudentDto.matricule || `STU-${Date.now().toString().slice(-6)}`;
    const existingStudent = await this.studentModel.findOne({ matricule });
    if (existingStudent) {
      throw new ConflictException('Student with this matricule already exists');
    }

    // if (createStudentDto.class) {
    //   await this.classService.findById(createStudentDto.class);
    // }

    const createdStudent = new this.studentModel({
      ...createStudentDto,
      matricule,
      class: createStudentDto.classId,
      averageGrade: createStudentDto.averageGrade ?? 0,
    });

    const savedStudent = await createdStudent.save();
    // Lier à la classe seulement si classId est fourni
    if (createStudentDto.classId) {
      await this.classService.addStudent(
        createStudentDto.classId,
        savedStudent._id.toString(),
      );
    }

    return this.mapToResponseDto(savedStudent);
  }

  async findAll(
    query: any = {},
    skip = 0,
    limit = 20,
  ): Promise<StudentResponseDto[]> {
    const students = await this.studentModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    return Promise.all(
      students.map((student) => this.mapToResponseDto(student)),
    );
  }

  async findById(id: string): Promise<StudentResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Student not found');
    }

    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.mapToResponseDto(student);
  }

  async findByMatricule(matricule: string): Promise<StudentResponseDto> {
    const student = await this.studentModel.findOne({ matricule }).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.mapToResponseDto(student);
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Student not found');
    }

    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // if (updateStudentDto.class && updateStudentDto.class !== student.class?.toString()) {
    //   if (student.class) {
    //     await this.classService.removeStudent(
    //       student.class.toString(),
    //       student._id.toString(),
    //     );
    //   }
    //   await this.classService.addStudent(
    //     updateStudentDto.class,
    //     student._id.toString(),
    //   );
    // }

    if (updateStudentDto.matricule) {
      const existingStudent = await this.studentModel.findOne({
        matricule: updateStudentDto.matricule,
        _id: { $ne: new Types.ObjectId(id) },
      });
      if (existingStudent) {
        throw new BadRequestException(
          'Un étudiant avec ce matricule existe déjà',
        );
      }
    }

    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, updateStudentDto, { new: true })
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.mapToResponseDto(updatedStudent);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Student not found');
    }

    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (student.class) {
      await this.classService.removeStudent(
        student.class.toString(),
        student._id.toString(),
      );
    }

    await this.studentModel.findByIdAndDelete(id).exec();
  }

  async searchStudents(searchTerm: string): Promise<StudentResponseDto[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    const students = await this.studentModel
      .find({
        $or: [
          { matricule: { $regex: searchTerm.trim(), $options: 'i' } },
          { firstName: { $regex: searchTerm.trim(), $options: 'i' } },
          { lastName: { $regex: searchTerm.trim(), $options: 'i' } },
        ],
      })
      .exec();

    return Promise.all(
      students.map((student) => this.mapToResponseDto(student)),
    );
  }

  async getPaginatedStudents(
    classId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedStudentsResponseDto> {
    const query: any = {};
    if (classId) {
      query.class = new Types.ObjectId(classId);
    }

    const [students, total] = await Promise.all([
      this.studentModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.studentModel.countDocuments(query),
    ]);

    return {
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      students: await Promise.all(
        students.map((student) => this.mapToResponseDto(student)),
      ),
    };
  }

  async addParent(
    studentId: string,
    parentId: string,
  ): Promise<StudentResponseDto> {
    if (
      !Types.ObjectId.isValid(studentId) ||
      !Types.ObjectId.isValid(parentId)
    ) {
      throw new BadRequestException('ID invalide');
    }

    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(
        studentId,
        { $addToSet: { parents: new Types.ObjectId(parentId) } },
        { new: true },
      )
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }

    return this.mapToResponseDto(updatedStudent);
  }

  async count(query: any = {}): Promise<number> {
    return this.studentModel.countDocuments(query).exec();
  }
}
