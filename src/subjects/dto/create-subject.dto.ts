import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsEnum, IsArray, Min, Max, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
    description: 'Code unique de la matière',
    example: 'MATH101',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Transform(({ value }) => value?.toUpperCase())
  code: string;

  @ApiProperty({
    description: 'ID de l\'école',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  school: string;

  @ApiProperty({
    description: 'ID de l\'année académique',
    example: '507f1f77bcf86cd799439012',
  })
  @IsString()
  @IsNotEmpty()
  academicYear: string;

  @ApiPropertyOptional({
    description: 'ID du département',
    example: '507f1f77bcf86cd799439013',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'ID de l\'enseignant',
    example: '507f1f77bcf86cd799439014',
  })
  @IsOptional()
  @IsString()
  teacher?: string;

  @ApiPropertyOptional({
    description: 'Description de la matière',
    example: 'Cours de mathématiques fondamentales pour le niveau primaire',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: 'Nombre de crédits de la matière',
    example: 3,
    minimum: 0,
    maximum: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  creditHours: number;

  @ApiProperty({
    description: 'Indique si la matière est obligatoire',
    example: true,
  })
  @IsBoolean()
  isCore: boolean;

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
