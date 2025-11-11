import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsMongoId,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GradeStatus, GradeType } from '../schemas/grade.schema';

export class CreateGradeDto {
  @ApiProperty({ description: 'Student ID' })
  @IsMongoId()
  @IsNotEmpty()
  student: string;

  @ApiProperty({ description: 'Teacher ID' })
  @IsMongoId()
  @IsNotEmpty()
  teacher: string;

  @ApiProperty({ minimum: 0, maximum: 20 })
  @IsNumber()
  @Min(0)
  @Max(20)
  @IsNotEmpty()
  value: number;

  @ApiProperty({ enum: GradeType })
  @IsEnum(GradeType)
  @IsNotEmpty()
  type: GradeType;

  @ApiProperty({ description: 'Subject ID' })
  @IsMongoId()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'Class ID' })
  @IsMongoId()
  @IsNotEmpty()
  class: string;

  @ApiProperty({ description: 'Term ID' })
  @IsMongoId()
  @IsNotEmpty()
  term: string;

  @ApiProperty({ description: 'AcademicYear ID' })
  @IsMongoId()
  @IsNotEmpty()
  academicYear: string;

  @ApiProperty({ required: false, minimum: 0, maximum: 20 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(20)
  outOf?: number;

  @ApiProperty({ required: false, minimum: 0, maximum: 10 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  weight?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  appreciation?: string;

  @ApiProperty({ required: false, enum: GradeStatus })
  @IsEnum(GradeStatus)
  @IsOptional()
  status?: GradeStatus;

  @ApiProperty({ required: false, description: 'ISO date string' })
  @IsDateString()
  @IsOptional()
  evaluationDate?: string;
}
