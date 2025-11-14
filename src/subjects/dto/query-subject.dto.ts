import { IsOptional, IsEnum, IsMongoId, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubjectCategory } from '../schemas/subject.schema';

export class QuerySubjectDto {
  @ApiPropertyOptional({ description: 'Filtrer par ID école' })
  @IsOptional()
  @IsMongoId()
  school?: string;

  @ApiPropertyOptional({ description: 'Filtrer par ID année académique' })
  @IsOptional()
  @IsMongoId()
  academicYear?: string;

  @ApiPropertyOptional({ enum: SubjectCategory, description: 'Filtrer par catégorie' })
  @IsOptional()
  @IsEnum(SubjectCategory)
  category?: SubjectCategory;

  @ApiPropertyOptional({ description: 'Filtrer par statut actif' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Filtrer par ID professeur principal' })
  @IsOptional()
  @IsMongoId()
  mainTeacher?: string;

  @ApiPropertyOptional({ description: 'Filtrer par ID classe' })
  @IsOptional()
  @IsMongoId()
  class?: string;
}
