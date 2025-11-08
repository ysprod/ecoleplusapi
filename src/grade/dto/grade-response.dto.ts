import { ApiProperty } from '@nestjs/swagger';
import { GradeType } from '../schemas/grade.schema';
import { ClassResponseDto } from 'src/class/dto/class-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';

export class GradeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  student: StudentResponseDto;

  @ApiProperty()
  teacher: TeacherResponseDto;

  @ApiProperty()
  value: number;

  @ApiProperty({ enum: GradeType })
  type: GradeType;

  @ApiProperty()
  trimester: number;

  @ApiProperty()
  comments?: string;

  @ApiProperty()
  subject?: SubjectResponseDto;

  @ApiProperty()
  class?: ClassResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}