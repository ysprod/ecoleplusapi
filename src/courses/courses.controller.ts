import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseSessionDto } from './dto/create-course-session.dto';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un cours (classe + matière + enseignant + année)' })
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les cours (filtrage facultatif)' })
  @ApiQuery({ name: 'school', required: false })
  @ApiQuery({ name: 'academicYear', required: false })
  @ApiQuery({ name: 'class', required: false })
  @ApiQuery({ name: 'subject', required: false })
  @ApiQuery({ name: 'teacher', required: false })
  findAll(
    @Query('school') school?: string,
    @Query('academicYear') academicYear?: string,
    @Query('class') classId?: string,
    @Query('subject') subject?: string,
    @Query('teacher') teacher?: string,
  ) {
    return this.coursesService.findCourses({ school, academicYear, class: classId, subject, teacher });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un cours par id' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findCourseById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un cours' })
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.updateCourse(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un cours (et ses sessions/inscriptions)' })
  remove(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }

  // Sessions
  @Post(':id/sessions')
  @ApiOperation({ summary: 'Créer une séance pour un cours' })
  createSession(@Param('id') id: string, @Body() body: Omit<CreateCourseSessionDto, 'course'>) {
    return this.coursesService.createSession({ ...body, course: id } as CreateCourseSessionDto);
  }

  @Get(':id/sessions')
  @ApiOperation({ summary: 'Lister les séances d’un cours' })
  listSessions(@Param('id') id: string) {
    return this.coursesService.listSessions(id);
  }

  // Enrollments
  @Post(':id/enrollments')
  @ApiOperation({ summary: 'Inscrire des élèves à un cours' })
  enroll(@Param('id') id: string, @Body() body: Omit<CreateCourseEnrollmentDto, 'course'>) {
    return this.coursesService.enroll({ ...body, course: id } as CreateCourseEnrollmentDto);
  }

  @Get(':id/enrollments')
  @ApiOperation({ summary: 'Lister les inscriptions d’un cours' })
  listEnrollments(@Param('id') id: string) {
    return this.coursesService.listEnrollments(id);
  }
}
