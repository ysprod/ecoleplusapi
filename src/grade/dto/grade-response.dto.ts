import { ApiProperty } from '@nestjs/swagger';
import { GradeStatus, GradeType } from '../schemas/grade.schema';
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

  @ApiProperty({ required: false })
  outOf?: number;

  @ApiProperty({ required: false })
  weight?: number;

  @ApiProperty({ enum: GradeStatus })
  status: GradeStatus;

  @ApiProperty()
  comments?: string;

  @ApiProperty({ required: false })
  appreciation?: string;

  @ApiProperty()
  subject?: SubjectResponseDto;

  @ApiProperty()
  class?: ClassResponseDto;

  @ApiProperty({ required: false, description: 'Term ID' })
  term?: string;

  @ApiProperty({ required: false, description: 'AcademicYear ID' })
  academicYear?: string;

  @ApiProperty({ required: false })
  evaluationDate?: Date;

  @ApiProperty({ required: false })
  submittedAt?: Date;

  @ApiProperty({ required: false })
  validatedAt?: Date;

  @ApiProperty({ required: false })
  validatedBy?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
