import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  localite?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  directeur?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  academicYear?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  educationLevel?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  statut?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  matricule?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  niveaux?: string[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  'services.cantine'?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  'services.transport'?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  'services.activites'?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  'frais.transport.montant'?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  'frais.activites.montant'?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  'frais.cotisationCoges.montant'?: number;
}