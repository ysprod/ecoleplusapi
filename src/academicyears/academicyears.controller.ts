import {
  BadRequestException, Body, Controller, Delete, Get, HttpCode,
  HttpStatus, Param, Patch, Post, Put, Query, UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { SchoolService } from '../school/school.service';
import { AcademicYearsService } from './academicyears.service';
import { AcademicYear } from './schemas/academic-year.schema';
import { CreateAcademicYearWithSchoolPayload } from './dtos/CreateAcademicYearWithSchoolPayload.dto';

@ApiTags('academicyears')
@ApiBearerAuth()
@Controller('academicyears')
export class AcademicYearsController {
  constructor(
    private readonly academicYearsService: AcademicYearsService,
    private readonly schoolService: SchoolService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Lister les années académiques avec leurs écoles' })
  @ApiOkResponse({ description: 'Liste des années académiques' })
  async listAll(@Query('user') userId?: string) {
    const academicYears =
      await this.academicYearsService.getAcademicYearsWithSchools(userId);
    console.log('📚 Retrieved academic years:', JSON.stringify(academicYears, null, 2));
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
  async createSchoolWithAcademicYear(
    @Body() payload: CreateAcademicYearWithSchoolPayload,
  ) {
    if (!payload.user || !Types.ObjectId.isValid(payload.user)) {
      throw new BadRequestException(
        'user is required and must be a valid ObjectId',
      );
    }

    // Validation basique des dates nécessaires si autoGenerateTerms activé
    if (payload.autoGenerateTerms) {
      if (!payload.startDate || !payload.endDate) {
        throw new BadRequestException(
          'startDate et endDate sont requis pour la génération automatique des trimestres',
        );
      }
      const start = new Date(payload.startDate);
      const end = new Date(payload.endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
        throw new BadRequestException(
          'startDate doit être une date valide antérieure à endDate',
        );
      }
    }

    // Validation des customTerms si fournis
    if (payload.customTerms && payload.customTerms.length > 0) {
      for (const term of payload.customTerms) {
        if (!term.startDate || !term.endDate) {
          throw new BadRequestException(
            'Chaque trimestre personnalisé doit avoir startDate et endDate',
          );
        }
        const tStart = new Date(term.startDate);
        const tEnd = new Date(term.endDate);
        if (
          isNaN(tStart.getTime()) ||
          isNaN(tEnd.getTime()) ||
          tStart >= tEnd
        ) {
          throw new BadRequestException(
            `Trimestre personnalisé invalide: startDate doit être antérieure à endDate (${term.name ?? 'sans nom'})`,
          );
        }
      }
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
      numberOfTerms: payload.numberOfTerms,
      autoGenerateTerms: payload.autoGenerateTerms,
      customTerms: payload.customTerms,
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
