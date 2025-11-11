import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { RemarkType } from '../schemas/remark.schema';

export class CreateRemarkDto {
  @ApiProperty({ description: 'Student ID' })
  @IsMongoId()
  @IsNotEmpty()
  student: string;

  @ApiProperty({ description: 'Term ID' })
  @IsMongoId()
  @IsNotEmpty()
  term: string;

  @ApiProperty({ description: 'AcademicYear ID' })
  @IsMongoId()
  @IsNotEmpty()
  academicYear: string;

  @ApiProperty({ enum: RemarkType })
  @IsEnum(RemarkType)
  @IsNotEmpty()
  type: RemarkType;

  @ApiProperty({ maxLength: 2000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;

  @ApiPropertyOptional({ description: 'Teacher ID' })
  @IsMongoId()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({ description: 'Subject ID (if SUBJECT_TEACHER)' })
  @IsMongoId()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorTitle?: string;
}
