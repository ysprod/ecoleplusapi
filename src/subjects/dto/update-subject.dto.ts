import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum, IsArray, Min, Max, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Transform(({ value }) => value?.toUpperCase())
  code?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsString()
  academicYear?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  teacher?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  creditHours?: number;

  @IsOptional()
  @IsBoolean()
  isCore?: boolean;

  @IsOptional()
  @IsString()
  electiveGroup?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prerequisites?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coRequisites?: string[];

  @IsOptional()
  @IsEnum(['active', 'inactive', 'archived'])
  status?: string;
}
