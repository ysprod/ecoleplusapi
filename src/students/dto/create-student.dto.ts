// src/student/dto/create-student.dto.ts
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
}