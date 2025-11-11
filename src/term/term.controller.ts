import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TermService } from './term.service';
import { CreateTermDto } from './dto/create-term.dto';
import {
  UpdateTermDto,
  UpdateTermStatusDto,
  PublishBulletinsDto,
} from './dto/update-term.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Terms')
@Controller('terms')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un trimestre' })
  create(@Body() dto: CreateTermDto) {
    return this.termService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les trimestres' })
  findAll() {
    return this.termService.findAll();
  }

  @Get('by-year/:schoolId/:academicYearId')
  @ApiOperation({
    summary: 'Lister les trimestres par école et année académique',
  })
  findByYear(
    @Param('schoolId') schoolId: string,
    @Param('academicYearId') academicYearId: string,
  ) {
    return this.termService.findByYear(schoolId, academicYearId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un trimestre par ID' })
  findOne(@Param('id') id: string) {
    return this.termService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un trimestre' })
  update(@Param('id') id: string, @Body() dto: UpdateTermDto) {
    return this.termService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Changer le statut du trimestre' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTermStatusDto) {
    return this.termService.updateStatus(id, dto);
  }

  @Patch(':id/publish-bulletins')
  @ApiOperation({ summary: 'Publier les bulletins et clôturer le trimestre' })
  publish(@Param('id') id: string, @Body() dto: PublishBulletinsDto) {
    return this.termService.publishBulletins(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un trimestre' })
  remove(@Param('id') id: string) {
    return this.termService.remove(id);
  }
}
