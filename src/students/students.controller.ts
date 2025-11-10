import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginatedStudentsResponseDto } from './dto/paginated-students.dto';
import { StudentResponseDto } from './dto/student-response.dto';
import { User, UserDocument } from '../user/schemas/user.schema';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Injection du userModel
  ) {}

  /**
   * Recherche d'étudiants par terme (nom, prénom, matricule, etc.)
   */
  @Get('search')
  async searchStudents(
    @Query('search') search: string,
  ): Promise<{ data: StudentResponseDto[] }> {
    if (!search || !search.trim()) return { data: [] };
    const results = await this.studentsService.searchStudents(search);
    return { data: results };
  }

  @Get()
  async findAll(): Promise<StudentResponseDto[]> {
    return this.studentsService.findAll();
  }

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<StudentResponseDto> {
    console.log('Creating student with data:', createStudentDto);
    return this.studentsService.create(createStudentDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentResponseDto> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }

  @Get('paginated')
  async getPaginated(
    @Query('classId') classId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedStudentsResponseDto> {
    return this.studentsService.getPaginatedStudents(classId, page, limit);
  }

  @Get('verifystudent')
  async verifyStudent(
    @Query('id') id: string,
  ): Promise<{ data: StudentResponseDto | null }> {
    console.log('Verifying student with user ID:', id);
    Logger.log(`ID reçu pour vérification : ${id}`, 'StudentsController');
    if (!id || !id.trim()) {
      throw new NotFoundException('User ID is required');
    }
    // Recherche l'utilisateur pour obtenir le matricule
    const user = await this.userModel
      .findById(id)
      .select('matricule')
      .lean()
      .exec();
    if (!user || !user.matricule) {
      throw new NotFoundException('Matricule not found for this user');
    }
    // Recherche l'étudiant par matricule
    const student = await this.studentsService.findByMatricule(user.matricule);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return { data: student };
  }

  @Get('matricule/:matricule')
  async findByMatricule(
    @Param('matricule') matricule: string,
  ): Promise<StudentResponseDto> {
    return this.studentsService.findByMatricule(matricule);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<StudentResponseDto> {
    return this.studentsService.findById(id);
  }

  @Post(':studentId/parents/:parentId')
  async addParent(
    @Param('studentId') studentId: string,
    @Param('parentId') parentId: string,
  ): Promise<StudentResponseDto> {
    return this.studentsService.addParent(studentId, parentId);
  }
}
