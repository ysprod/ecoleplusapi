import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolResponseDto } from './dto/school-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/schemas/user.schema';

@Controller('schools')
// @UseGuards(JwtAuthGuard)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  // Bridge endpoint to support frontend call /schools/educators?schoolId=...&niveau=...
  // Must be declared BEFORE the dynamic ":id" route to avoid it being captured by ":id".
  @Get('educators')
  @Redirect(undefined, 302)
  getEducatorsRedirect(
    @Query('schoolId') schoolId?: string,
    @Query('niveau') niveau?: string,
  ) {
    const params = new URLSearchParams();
    if (schoolId) params.set('schoolId', schoolId);
    if (niveau) params.set('niveau', niveau);
    return {
      url: `/educators/classes${params.toString() ? `?${params.toString()}` : ''}`,
    };
  }

  @Post()
  async create(
    @Body() createSchoolDto: CreateSchoolDto,
    @GetUser() user: User,
  ): Promise<SchoolResponseDto> {
    return this.schoolService.create(createSchoolDto, user._id.toString());
  }

  @Put()
  async update(
    @Body() updateSchoolDto: UpdateSchoolDto,
    @GetUser() user: User,
  ): Promise<SchoolResponseDto> {
    return this.schoolService.update(updateSchoolDto, user._id.toString());
  }

  @Get()
  async findAll(): Promise<SchoolResponseDto[]> {
    return this.schoolService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SchoolResponseDto> {
    const school = await this.schoolService.findById(id);
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.schoolService.delete(id);
  }

  @Post(':schoolId/teachers/:teacherId')
  async addTeacher(
    @Param('schoolId') schoolId: string,
    @Param('teacherId') teacherId: string,
  ): Promise<SchoolResponseDto> {
    return this.schoolService.addTeacher(schoolId, teacherId);
  }

  @Post(':schoolId/academic-years/:academicYearId')
  async addAcademicYear(
    @Param('schoolId') schoolId: string,
    @Param('academicYearId') academicYearId: string,
  ): Promise<SchoolResponseDto> {
    return this.schoolService.addAcademicYear(schoolId, academicYearId);
  }

  @Get(':schoolId/levels/:niveau')
  async findBySchoolAndLevel(
    @Param('schoolId') schoolId: string,
    @Param('niveau') niveau: string,
  ) {
    return this.schoolService.findBySchoolAndLevel(schoolId, niveau);
  }
}
