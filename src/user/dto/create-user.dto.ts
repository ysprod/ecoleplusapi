import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ROLES, PROFILE_TYPES } from '../schemas/user.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  matricule?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: ROLES })
  @IsNotEmpty()
  @IsEnum(ROLES, {
    message: 'role must be one of: ' + Object.values(ROLES).join(', '),
  })
  role: string;

  @ApiProperty({ enum: PROFILE_TYPES, default: 'other', required: false })
  @IsOptional()
  @IsEnum(PROFILE_TYPES, {
    message:
      'profileType must be one of: ' + Object.values(PROFILE_TYPES).join(', '),
  })
  profileType?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false, type: String, example: '1990-01-01' })
  @IsOptional()
  @Type(() => Date) // transforme string en Date
  @IsDate({
    message: 'birthDate must be a valid Date (ISO string: YYYY-MM-DD)',
  })
  birthDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  avatar?: string;
}
