import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiProperty({ enum: ['HOMEWORK', 'QUIZ', 'EXAM'] })
  type: 'HOMEWORK' | 'QUIZ' | 'EXAM';

  @ApiProperty()
  trimester: number;

  @ApiPropertyOptional()
  comments?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional()
  studentId?: string;

  @ApiPropertyOptional()
  teacherId?: string;
}
