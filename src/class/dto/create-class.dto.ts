// src/class/dto/create-class.dto.ts
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ['Primaire', 'Collège', 'Lycée'] })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  academicYear?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  user?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  subjects?: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  tuitionFee?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  canteenFee?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  transportFee?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  activitiesFee?: number;
}
