import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  private readonly logger = new Logger(SubjectsController.name);

  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    try {
      this.logger.log('Creating subject with data:', JSON.stringify(createSubjectDto));
      return await this.subjectsService.create(createSubjectDto);
    } catch (error) {
      this.logger.error('Failed to create subject:', error.message, error.stack);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Liste des matières' })
  @ApiResponse({
    status: 200,
    description: 'Liste des matières récupérée avec succès',
    type: [String],
  })
  async findAll(
    @Query('schoolId') schoolId?: string,
    @Query('academicYearId') academicYearId?: string
  ) {
    try {
      if (schoolId && academicYearId) {
        return await this.subjectsService.findBySchool(schoolId, academicYearId);
      }
      if (schoolId) {
        return await this.subjectsService.findBySchool(schoolId, academicYearId);
      }
      return await this.subjectsService.findAll();
    } catch (error) {
      this.logger.error('Failed to fetch subjects:', error.message, error.stack);
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.subjectsService.archive(id);
  }
}
