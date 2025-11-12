import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TermType } from '../../term/schemas/term.schema';

// Trimestre personnalisé transmis depuis le frontend
export class CustomTermInput {
  @ApiPropertyOptional({ example: '1er Trimestre' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: TermType })
  @IsOptional()
  @IsEnum(TermType)
  type?: TermType;

  @ApiProperty({ example: '2025-11-01' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-01-31' })
  @IsDateString()
  endDate!: string;
}

// Payload global pour POST /academicyears
export class CreateAcademicYearWithSchoolPayload {
  // Champs école
  @ApiProperty({ example: 'Lycée Victor Hugo' })
  @IsString()
  nom!: string;

  @ApiProperty({ example: 'Abidjan' })
  @IsString()
  localite!: string;

  @ApiProperty({ example: 'Mme Dupont' })
  @IsString()
  directeur!: string;

  @ApiProperty({ example: '+22501020304' })
  @IsString()
  phone!: string;

  @ApiProperty({ example: 'ecole@exemple.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'privé' })
  @IsOptional()
  @IsString()
  statut?: string;

  @ApiPropertyOptional({ type: [String], example: ['Primaire', 'Collège'] })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  niveaux?: string[];

  @ApiPropertyOptional({ example: 'SCH-11824-811' })
  @IsOptional()
  @IsString()
  matricule?: string;

  // Champs année académique
  @ApiProperty({ example: '2025-2026' })
  @IsString()
  name!: string; // ex: "2025-2026" ou libellé

  @ApiPropertyOptional({ example: '2025-2026' })
  @IsOptional()
  @IsString()
  year?: string; // éventuel identifiant/affichage

  @ApiProperty({ example: '2025-11-07' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-11-12' })
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @ApiProperty({
    example: '6913f872157404c2372198c9',
    description: 'User ObjectId',
  })
  @IsMongoId()
  user!: string; // ObjectId sous forme string

  // Gestion des trimestres
  @ApiPropertyOptional({ default: 3, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  numberOfTerms?: number = 3; // par défaut 3

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  autoGenerateTerms?: boolean;

  @ApiPropertyOptional({ type: [CustomTermInput] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CustomTermInput)
  customTerms?: CustomTermInput[]; // liste si définie par l'utilisateur
}
