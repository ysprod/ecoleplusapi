import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { EducatorService } from './educator.service';

@Controller('educators')
export class EducatorController {
  constructor(private readonly educatorService: EducatorService) {}

  @Get('classes')
  async getEducatorsBySchoolAndNiveau(
    @Query('schoolId') schoolId: string,
    @Query('niveau') niveau: string,
  ) {

    // Vérifie les paramètres
    if (!schoolId || !niveau) {
      throw new NotFoundException('schoolId and niveau are required');
    }
    // Appelle le service pour récupérer les données
    const classes = await this.educatorService.findClassesBySchoolAndNiveau(schoolId, niveau);
    if (!classes || classes.length === 0) {
      throw new NotFoundException('No classes found for this school and niveau');
    }
    return { data: { classes } };
  }

  @Get('classes/:schoolId/:niveau')
  async getEducatorsBySchoolAndNiveauPath(
    @Param('schoolId') schoolId: string,
    @Param('niveau') niveau: string,
  ) {
    if (!schoolId || !niveau) {
      throw new NotFoundException('schoolId and niveau are required');
    }
    const classes = await this.educatorService.findClassesBySchoolAndNiveau(schoolId, niveau);
    if (!classes || classes.length === 0) {
      throw new NotFoundException('No classes found for this school and niveau');
    }
    return { data: { classes } };
  }

  @Get('classes/:educatorId')
  async getEducatorClasses(@Param('educatorId') educatorId: string) {
    return this.educatorService.getEducatorClasses(educatorId);
  }

  @Get('class-educator')
  async getSchoolClasseEducator(@Query('classId') classId: string) {
    return this.educatorService.getEducatorOfClass(classId);
  }
}