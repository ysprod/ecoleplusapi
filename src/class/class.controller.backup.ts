
import { Controller, Get, Post, Body, Param, Query, Patch, Delete, UseGuards, } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassResponseDto } from './dto/class-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/schemas/user.schema';
import { ClassStatisticsDto } from './dto/class-stats.dto';
import { Types } from 'mongoose';

@Controller('classes')
//@UseGuards(JwtAuthGuard)
export class ClassController {
  /**
   * Statistiques agrégées sur les classes (pour dashboard)
   */
  @Get('stats')
  async getClassStats() {
    const stats = await this.classService.getClassStats();
    return { data: stats };
  }
  /**
   * Retourne les étudiants d'une école (pagination, filtre niveau)
   */
  @Get('students')
  async getSchoolStudents(
    @Query('schoolId') schoolId: string,
    @Query('niveau') niveau?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const options: any = { page, limit, niveau };
    return await this.classService.getSchoolStudents(schoolId, options);
  }

  constructor(private readonly classService: ClassService) { }

  @Post()
  async create(
    @Body() createClassDto: CreateClassDto,
  ): Promise<ClassResponseDto> {
    return this.classService.create(createClassDto);
  }

  @Get()
  async find(
    @Query('schoolId') schoolId?: string,
    @Query('niveau') niveau?: string,
  ): Promise<ClassResponseDto[]> {
    return this.classService.find({ schoolId, niveau });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ClassResponseDto> {
    return this.classService.findById(id);
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
    @GetUser() user: User,
  ): Promise<ClassResponseDto> {
    return this.classService.update(id, updateClassDto, user._id.toString());
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(id);
  }

  @Post(':classId/students/:studentId')
  async addStudent(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ): Promise<ClassResponseDto> {
    return this.classService.addStudent(classId, studentId);
  }

  @Post(':classId/teachers/:teacherId')
  async addTeacher(
    @Param('classId') classId: string,
    @Param('teacherId') teacherId: string,
  ): Promise<ClassResponseDto> {
    return this.classService.addTeacher(classId, teacherId);
  }

  @Post(':classId/educator/:educatorId')
  async assignEducator(
    @Param('classId') classId: string,
    @Param('educatorId') educatorId: string,
  ): Promise<ClassResponseDto> {
    return this.classService.assignEducator(classId, educatorId);
  }

  @Get('stats/school/:schoolId')
  async getSchoolClassStats(
    @Param('schoolId') schoolId: string,
  ): Promise<ClassStatisticsDto> {
    return this.classService.getClassStats(schoolId);
  }

  @Get('stats/global')
  async getGlobalClassStats(): Promise<ClassStatisticsDto> {
    return this.classService.getClassStats();
  }
  /**
   * Retourne tous les élèves d'une école (optionnellement paginés)
   * GET /classes/students?schoolId=xxx&page=1&limit=20
   */
  /**
   * GET /classes/academic?schoolId=xxx&classType=xxx&niveau=xxx
   * Retourne les classes académiques filtrées pour le front-end
   */
  @Get('academic')
  async getAcademicClasses(
    @Query('schoolId') schoolId: string,
    @Query('classType') classType?: string,
    @Query('niveau') niveau?: string,
  ): Promise<{ data: any[] }> {
    if (!schoolId || !Types.ObjectId.isValid(schoolId)) {
      throw new Error('schoolId is required and must be a valid ObjectId');
    }
    // À adapter selon votre service et DTO
    const classes = await this.classService.getAcademicClasses(schoolId, classType, niveau);
    return { data: classes };
  }

  @Get('school/:schoolId/niveau/:niveau')
  async getClassesBySchoolAndNiveau(
    @Param('schoolId') schoolId: string,
    @Param('niveau') niveau: string,
  ): Promise<ClassResponseDto[]> {
    return this.classService.find({ schoolId, niveau });
  }

  @Get(':id/details')
  async getClassDetails(@Param('id') id: string) {
    // Récupère la classe, l'école et les élèves
    const classe = await this.classService.findById(id);
    const school = classe ? await this.classService.getSchoolForClass(id) : null;
    const students = classe ? await this.classService.getStudentsForClass(id) : [];
    return { classe, school, students };
  }

  /**
   * Récupère les enseignants d'une classe donnée
   * GET /classes/:id/teachers
   */
  @Get(':id/teachers')
  async getClassTeachers(@Param('id') id: string) {
    const teachers = await this.classService.getTeachersForClass(id);
    return { 
      classId: id,
      teachers,
      count: teachers.length 
    };
  }

  /**
   * Récupère les élèves d'une classe donnée
   * GET /classes/:id/students
   */
  @Get(':id/students')
  async getClassStudents(@Param('id') id: string) {
    const students = await this.classService.getStudentsForClass(id);
    return {
      classId: id,
      students,
      count: students.length
    };
  }
}