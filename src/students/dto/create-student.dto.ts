// src/student/dto/create-student.dto.ts
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, BloodGroup } from '../schemas/student.schema';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  birthPlace?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ enum: BloodGroup, required: false })
  @IsEnum(BloodGroup)
  @IsOptional()
  bloodGroup?: BloodGroup;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  parentContact?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  class?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  classLevel?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  healthNotes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  healthIssues?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  forbiddenFoods?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  matricule?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nomPere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  prenomPere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  telephonePere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  professionPere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nomMere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  prenomMere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  telephoneMere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  professionMere?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  emergencyContactPhone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  emergencyContactRelation?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  previousSchool?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  enrollmentDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  allergies?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  medications?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  specialNeeds?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  transportMode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lunchOption?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  insuranceNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  insuranceProvider?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  siblingIds?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  studentPhoto?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  birthCertificateUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  transferCertificateUrl?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  documents?: string[];
}