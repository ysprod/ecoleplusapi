import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConductLevel } from '../schemas/conduct.schema';

export class ConductSanctionDto {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Type de sanction (ex: avertissement, blâme, exclusion...)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Raison de la sanction' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: 'Teacher ID' })
  @IsMongoId()
  teacher: string;
}

export class CreateConductDto {
  @ApiProperty({ description: 'Student ID' })
  @IsMongoId()
  @IsNotEmpty()
  student: string;

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

  @ApiPropertyOptional({ enum: ConductLevel, default: ConductLevel.BIEN })
  @IsEnum(ConductLevel)
  @IsOptional()
  discipline?: ConductLevel;

  @ApiPropertyOptional({ enum: ConductLevel, default: ConductLevel.BIEN })
  @IsEnum(ConductLevel)
  @IsOptional()
  behavior?: ConductLevel;

  @ApiPropertyOptional({ enum: ConductLevel, default: ConductLevel.BIEN })
  @IsEnum(ConductLevel)
  @IsOptional()
  participation?: ConductLevel;

  @ApiPropertyOptional({ enum: ConductLevel, default: ConductLevel.BIEN })
  @IsEnum(ConductLevel)
  @IsOptional()
  workHabits?: ConductLevel;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  absences?: number;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  justifiedAbsences?: number;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  lates?: number;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  sanctions?: number;

  @ApiPropertyOptional({ default: 100, minimum: 0, maximum: 100 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  attendanceRate?: number;

  @ApiPropertyOptional({ maxLength: 1000 })
  @IsString()
  @IsOptional()
  generalRemarks?: string;

  @ApiPropertyOptional({ type: [ConductSanctionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConductSanctionDto)
  @IsOptional()
  sanctionsList?: ConductSanctionDto[];
}
