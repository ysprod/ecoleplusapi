import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { TermStatus, TermType } from '../schemas/term.schema';

export class CreateTermDto {
  @ApiProperty({ enum: TermType })
  @IsEnum(TermType)
  type: TermType;

  @ApiProperty({ example: '1er Trimestre' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2025-09-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-12-20' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: "ID de l'année académique" })
  @IsMongoId()
  academicYear: string;

  @ApiProperty({ description: "ID de l'école" })
  @IsMongoId()
  school: string;

  @ApiPropertyOptional({ enum: TermStatus, default: TermStatus.PLANNED })
  @IsOptional()
  @IsEnum(TermStatus)
  status?: TermStatus;

  @ApiPropertyOptional({ description: 'Date du conseil de classe', example: '2025-12-25' })
  @IsOptional()
  @IsDateString()
  councilDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  bulletinsGenerated?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  bulletinsPublished?: boolean;
}
