import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsArray,
  IsMongoId,
  Min,
  Max,
  MaxLength,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubjectCategory } from '../schemas/subject.schema';

export class CreateSubjectDto {
  @ApiProperty({
    description: 'Nom de la matière',
    example: 'Mathématiques',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Code unique de la matière (lettres majuscules et chiffres uniquement)',
    example: 'MATH',
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Le code doit contenir uniquement des lettres majuscules et des chiffres'
  })
  @Transform(({ value }) => value?.toUpperCase())
  code: string;

  @ApiProperty({
    description: 'Catégorie de la matière',
    enum: SubjectCategory,
    example: SubjectCategory.SCIENCES,
  })
  @IsEnum(SubjectCategory)
  category: SubjectCategory;

  @ApiProperty({
    description: 'Coefficient de la matière',
    example: 3,
    minimum: 1,
    maximum: 10,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  coefficient: number;

  @ApiPropertyOptional({
    description: 'Description de la matière',
    example: 'Cours de mathématiques niveau secondaire',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'ID du professeur principal',
    example: '507f1f77bcf86cd799439013',
  })
  @IsOptional()
  @IsMongoId()
  mainTeacher?: string;

  @ApiPropertyOptional({
    description: 'IDs des classes associées',
    type: [String],
    example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  classes?: string[];

  @ApiProperty({
    description: "ID de l'école",
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  school?: string;

  @ApiProperty({
    description: "ID de l'année académique",
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  academicYear?: string;

  @ApiPropertyOptional({
    description: 'Statut actif de la matière',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Couleur de la matière en hexadécimal',
    example: '#3b82f6',
    pattern: '^#[0-9A-F]{6}$',
  })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'La couleur doit être au format hexadécimal (ex: #3b82f6)'
  })
  color?: string;
}
