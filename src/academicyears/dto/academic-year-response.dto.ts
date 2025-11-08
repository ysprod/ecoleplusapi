import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcademicYearResponseDto {
  @ApiProperty({
    description: 'ID of the academic year to update',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Start date of the academic year (YYYY-MM-DD format)',
    example: '2023-09-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End date of the academic year (YYYY-MM-DD format)',
    example: '2024-06-30',
    required: false,
  })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Whether this academic year is the current one',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @ApiProperty({
    description: 'Education levels included in this academic year',
    example: ['Primaire', 'Collège', 'Lycée'],
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  niveaux?: string[];

  @ApiProperty({
    description: 'Name of the academic year',
    example: 'Année scolaire 2023-2024',
    required: false,
  })
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiProperty({
    description: 'Location of the school for this academic year',
    example: 'Paris',
    required: false,
  })
  @IsString()
  @IsOptional()
  localite?: string;

  @ApiProperty({
    description: 'Director name for this academic year',
    example: 'Jean Dupont',
    required: false,
  })
  @IsString()
  @IsOptional()
  directeur?: string;

  @ApiProperty({
    description: 'Contact phone number for this academic year',
    example: '+33123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Contact email for this academic year',
    example: 'contact@ecole.fr',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Status of the academic year',
    example: 'active',
    required: false,
  })
  @IsString()
  @IsOptional()
  statut?: string;
}