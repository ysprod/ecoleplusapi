import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RemarkType } from '../schemas/remark.schema';

export class RemarkResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'Student ID' })
  student: string;

  @ApiProperty({ description: 'Term ID' })
  term: string;

  @ApiProperty({ description: 'AcademicYear ID' })
  academicYear: string;

  @ApiProperty({ enum: RemarkType })
  type: RemarkType;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional({ description: 'Teacher ID' })
  author?: string;

  @ApiPropertyOptional({ description: 'Subject ID' })
  subject?: string;

  @ApiPropertyOptional()
  authorName?: string;

  @ApiPropertyOptional()
  authorTitle?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
