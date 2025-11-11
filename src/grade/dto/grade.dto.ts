import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GradeStatus, GradeType } from '../schemas/grade.schema';

export class GradeDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  student: string;

  @ApiProperty()
  teacher: string;

  @ApiProperty()
  subject: string;

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

  @ApiPropertyOptional()
  comments?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  appreciation?: string;

  @ApiPropertyOptional({ description: 'Term ID' })
  term?: string;

  @ApiPropertyOptional({ description: 'AcademicYear ID' })
  academicYear?: string;

  @ApiPropertyOptional()
  evaluationDate?: string;

  @ApiPropertyOptional()
  submittedAt?: string;

  @ApiPropertyOptional()
  validatedAt?: string;

  @ApiPropertyOptional()
  validatedBy?: string;
}
