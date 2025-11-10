import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  matricule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    enum: ['masculin', 'feminin', 'autre', 'female', 'male', 'MALE', 'FEMALE'],
    default: 'masculin',
  })
  @IsEnum(['masculin', 'feminin', 'autre', 'female', 'male', 'MALE', 'FEMALE'])
  @IsOptional()
  gender?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ type: [String], required: false })
  @IsString({ each: true })
  @IsOptional()
  subjects?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsString({ each: true })
  @IsOptional()
  classes?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsString({ each: true })
  @IsOptional()
  schools?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsString({ each: true })
  @IsOptional()
  grades?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
