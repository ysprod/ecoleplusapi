import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { SubjectsService } from './subjects.service.improved';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto.new';
import { QuerySubjectDto } from './dto/query-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Matières')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle matière' })
  @ApiResponse({
    status: 201,
    description: 'Matière créée avec succès'
  })
  @ApiResponse({
    status: 409,
    description: 'Une matière avec ce code existe déjà'
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSubjectDto: CreateSubjectDto,
    @Request() req: any
  ) {
    return this.subjectsService.create(createSubjectDto, req.user._id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les matières avec filtres' })
  @ApiResponse({
    status: 200,
    description: 'Liste des matières récupérée avec succès'
  })
  async findAll(@Query() queryDto: QuerySubjectDto) {
    return this.subjectsService.findAll(queryDto);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Obtenir les statistiques des matières' })
  @ApiQuery({ name: 'schoolId', required: true, type: String })
  @ApiQuery({ name: 'academicYearId', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées avec succès'
  })
  async getStatistics(
    @Query('schoolId') schoolId: string,
    @Query('academicYearId') academicYearId: string
  ) {
    return this.subjectsService.getStatistics(schoolId, academicYearId);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Récupérer les matières par école' })
  @ApiParam({ name: 'schoolId', type: String })
  @ApiQuery({ name: 'academicYearId', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Matières récupérées avec succès'
  })
  async findBySchool(
    @Param('schoolId') schoolId: string,
    @Query('academicYearId') academicYearId: string
  ) {
    return this.subjectsService.findBySchool(schoolId, academicYearId);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Récupérer les matières par catégorie' })
  @ApiParam({ name: 'category', type: String })
  @ApiQuery({ name: 'schoolId', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Matières récupérées avec succès'
  })
  async findByCategory(
    @Param('category') category: string,
    @Query('schoolId') schoolId: string
  ) {
    return this.subjectsService.findByCategory(category, schoolId);
  }

  @Get('teacher/:teacherId')
  @ApiOperation({ summary: 'Récupérer les matières d\'un professeur' })
  @ApiParam({ name: 'teacherId', type: String })
  @ApiResponse({
    status: 200,
    description: 'Matières récupérées avec succès'
  })
  async findByTeacher(@Param('teacherId') teacherId: string) {
    return this.subjectsService.findByTeacher(teacherId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Récupérer les matières d\'une classe' })
  @ApiParam({ name: 'classId', type: String })
  @ApiResponse({
    status: 200,
    description: 'Matières récupérées avec succès'
  })
  async findByClass(@Param('classId') classId: string) {
    return this.subjectsService.findByClass(classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une matière par ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Matière récupérée avec succès'
  })
  @ApiResponse({
    status: 404,
    description: 'Matière non trouvée'
  })
  async findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une matière' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Matière mise à jour avec succès'
  })
  @ApiResponse({
    status: 404,
    description: 'Matière non trouvée'
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit avec le code de matière'
  })
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @Request() req: any
  ) {
    return this.subjectsService.update(id, updateSubjectDto, req.user._id);
  }

  @Patch(':id/toggle-status')
  @ApiOperation({ summary: 'Activer/Désactiver une matière' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Statut de la matière modifié avec succès'
  })
  async toggleStatus(@Param('id') id: string, @Request() req: any) {
    return this.subjectsService.toggleStatus(id, req.user._id);
  }

  @Patch(':id/assign-teacher/:teacherId')
  @ApiOperation({ summary: 'Affecter un professeur à une matière' })
  @ApiParam({ name: 'id', type: String })
  @ApiParam({ name: 'teacherId', type: String })
  @ApiResponse({
    status: 200,
    description: 'Professeur affecté avec succès'
  })
  async assignTeacher(
    @Param('id') id: string,
    @Param('teacherId') teacherId: string,
    @Request() req: any
  ) {
    return this.subjectsService.assignTeacher(id, teacherId, req.user._id);
  }

  @Patch(':id/assign-classes')
  @ApiOperation({ summary: 'Affecter des classes à une matière' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Classes affectées avec succès'
  })
  async assignClasses(
    @Param('id') id: string,
    @Body('classIds') classIds: string[],
    @Request() req: any
  ) {
    return this.subjectsService.assignClasses(id, classIds, req.user._id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une matière' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Matière supprimée avec succès'
  })
  @ApiResponse({
    status: 400,
    description: 'Impossible de supprimer la matière (notes associées)'
  })
  @ApiResponse({
    status: 404,
    description: 'Matière non trouvée'
  })
  async remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
