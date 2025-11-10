import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { SchoolService } from '../school/school.service';
import { AcademicYearsService } from './academicyears.service';
import { AcademicYear } from './schemas/academic-year.schema';

@ApiTags('academicyears')
@ApiBearerAuth()
@Controller('academicyears')
export class AcademicYearsController {
  constructor(
    private readonly academicYearsService: AcademicYearsService,
    private readonly schoolService: SchoolService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lister les années académiques avec leurs écoles' })
  @ApiOkResponse({ description: 'Liste des années académiques' })
  async listAll(@Query('user') userId?: string) {
    const academicYears =
      await this.academicYearsService.getAcademicYearsWithSchools(userId);
    return {
      success: true,
      hasData: academicYears.length > 0,
      data: academicYears,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Créer une année académique et la lier à une école',
  })
  @ApiCreatedResponse({ description: 'Année académique créée' })
  async createSchoolWithAcademicYear(@Body() payload: any) {
    if (!payload.user || !Types.ObjectId.isValid(payload.user)) {
      throw new BadRequestException(
        'user is required and must be a valid ObjectId',
      );
    }

    // Séparer les données d'école et d'année académique
    const schoolData = {
      nom: payload.nom,
      localite: payload.localite,
      directeur: payload.directeur,
      phone: payload.phone,
      email: payload.email,
      statut: payload.statut,
      niveaux: payload.niveaux,
      matricule: payload.matricule,
    };

    const academicYearData = {
      name: payload.name,
      year: payload.year,
      startDate: payload.startDate,
      endDate: payload.endDate,
      isCurrent: payload.isCurrent,
      user: payload.user,
    };

    // D'abord vérifier si une école avec cet email existe déjà
    let school = await this.schoolService.findByEmail(payload.email);

    // Si l'école n'existe pas, la créer
    if (!school) {
      school = await this.schoolService.create(schoolData, payload.user);
    }

    // Ensuite créer l'année académique avec l'ID de l'école
    const restructuredPayload = {
      schoolId: school.id,
      academicYear: academicYearData,
    };

    const result =
      await this.academicYearsService.createSchoolWithAcademicYear(
        restructuredPayload,
      );
    return { success: true, data: result };
  }

  @Put()
  @ApiOperation({ summary: 'Mettre à jour une année académique' })
  @ApiOkResponse({ description: 'Année académique mise à jour' })
  async updateSchoolWithAcademicYear(
    @Body() data: { id: string } & Partial<AcademicYear>,
  ) {
    const updated =
      await this.academicYearsService.updateSchoolWithAcademicYear(data);
    return { success: true, data: updated };
  }

  @Patch()
  @ApiOperation({ summary: 'Modifier partiellement une année académique' })
  @ApiOkResponse({ description: 'Année académique modifiée' })
  async patchSchoolWithAcademicYear(
    @Body() data: { id: string } & Partial<AcademicYear>,
  ) {
    const updated =
      await this.academicYearsService.updateSchoolWithAcademicYear(data);
    return { success: true, data: updated };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Supprimer l'année académique et l'école associée" })
  @ApiOkResponse({ description: 'Année académique et école supprimées' })
  async deleteSchoolWithAcademicYear(
    @Query('schoolId') schoolId: string,
    @Query('academicYearId') academicYearId: string,
  ) {
    const result = await this.academicYearsService.deleteSchoolWithAcademicYear(
      { schoolId, academicYearId },
    );
    return { success: true, data: result };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une année académique par ID' })
  findOne(@Param('id') id: string) {
    return this.academicYearsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une année académique par ID' })
  remove(@Param('id') id: string) {
    return this.academicYearsService.remove(id);
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException('JWT payload missing sub');
    }
    return { _id: payload.sub, email: payload.email, role: payload.role };
  }
}
