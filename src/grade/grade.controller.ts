import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradeResponseDto } from './dto/grade-response.dto';

@Controller('grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  async create(
    @Body() createGradeDto: CreateGradeDto,
  ): Promise<GradeResponseDto> {
    return this.gradeService.create(createGradeDto);
  }

  @Get('student/:studentId')
  async findByStudentId(
    @Param('studentId') studentId: string,
  ): Promise<GradeResponseDto[]> {
    return this.gradeService.findByStudentId(studentId);
  }

  @Delete()
  async deleteByStudentId(
    @Query('studentId') studentId: string,
  ): Promise<void> {
    return this.gradeService.deleteByStudentId(studentId);
  }
}
