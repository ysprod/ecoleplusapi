import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/schemas/user.schema';
import { PaginatedTeachersResponseDto } from './dto/paginated-teachers.dto';

@Controller('teachers')
export class TeacherController {

  constructor(private readonly teacherService: TeacherService) { }

  @Get('single')
  async findSingleTeacher(@Query('matricule') matricule: string) {
    if (!matricule) {
      return { data: null };
    }
    
    try {
      const teacher = await this.teacherService.findByMatricule(matricule);
      return { data: teacher };
    } catch (error) {
      return { data: null };
    }
  }

  /**
   * Création ou mise à jour d'un enseignant (upsert)
   */
  @Post('upsert')
  async createOrUpdateTeacher(@Body() body: CreateTeacherDto): Promise<{ success: boolean; data: TeacherResponseDto }> {
    // Recherche l'enseignant existant par matricule
    const teacher = body.matricule ? await this.teacherService.findByMatricule(body.matricule) : null;

    if (teacher && teacher.id) {
      // Mise à jour
      const updateDto: UpdateTeacherDto = {
        firstName: body.firstName,
        lastName: body.lastName,
        subjects: body.subjects,
        matricule: body.matricule,
        id: teacher.id,
      };
      const updated = await this.teacherService.update(teacher.id, updateDto);
      return { success: true, data: updated };
    } else {
      // Création
      const createDto: CreateTeacherDto = {
        matricule: body.matricule,
        firstName: body.firstName,
        lastName: body.lastName,
        subjects: body.subjects,
      };
      const created = await this.teacherService.create(createDto);
      return { success: true, data: created };
    }
  }

  /**
   * Retourne un enseignant par son id
   */
  @Get('alone/:id')
  async getAloneTeacher(@Param('id') id: string) {
    const teacher = await this.teacherService.findByUserId(id);
    return { data: teacher };
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTeacherDto: CreateTeacherDto,
    @GetUser() user: User,
  ): Promise<TeacherResponseDto> {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  async findAll(): Promise<TeacherResponseDto[]> {
    return this.teacherService.findAll();
  }

  @Get('school/:schoolId')
  async findBySchool(
    @Param('schoolId') schoolId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ): Promise<PaginatedTeachersResponseDto> {
    return this.teacherService.getTeachersBySchool(schoolId, page, limit);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TeacherResponseDto> {
    return this.teacherService.findById(id);
  }

  @Get('matricule/:matricule')
  async findByMatricule(
    @Param('matricule') matricule: string,
  ): Promise<TeacherResponseDto> {
    return this.teacherService.findByMatricule(matricule);
  }

  @Get('profile/me')
  // @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<TeacherResponseDto> {
    return this.teacherService.getTeacherProfile(req.user.id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Patch(':id/subjects')
  // @UseGuards(JwtAuthGuard)
  async updateSubjects(
    @Param('id') id: string,
    @Body('subjects') subjects: string[],
  ): Promise<TeacherResponseDto> {
    return this.teacherService.updateSubjects(id, subjects);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.teacherService.remove(id);
  }

  @Post('assign')
  async assignTeacherToClass(
    @Body() payload: {
      matricule: string;
      teacherId: string;
      subjects: string[];
      classId: string;
      schoolId: string;
    }
  ) {

    return this.teacherService.assignTeacherToClass(payload);
  }
}
