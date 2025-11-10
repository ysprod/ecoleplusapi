import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GradeType } from '../schemas/grade.schema';

export class CreateGradeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  student: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teacher: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ enum: GradeType })
  @IsEnum(GradeType)
  @IsNotEmpty()
  type: GradeType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  trimester: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  class?: string;
}
