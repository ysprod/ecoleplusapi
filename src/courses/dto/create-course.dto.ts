import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WeekParity } from '../schemas/course.schema';

class WeeklySlotDto {
  @ApiProperty({ minimum: 0, maximum: 6 })
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ example: '08:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  endTime: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  room?: string;

  @ApiProperty({ enum: WeekParity, required: false })
  @IsOptional()
  @IsEnum(WeekParity)
  weekParity?: WeekParity;
}

export class CreateCourseDto {
  @ApiProperty()
  @IsMongoId()
  school: string;

  @ApiProperty()
  @IsMongoId()
  academicYear: string;

  @ApiProperty()
  @IsMongoId()
  class: string;

  @ApiProperty()
  @IsMongoId()
  subject: string;

  @ApiProperty()
  @IsMongoId()
  mainTeacher: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  coTeachers?: string[];

  @ApiProperty({ type: [WeeklySlotDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeeklySlotDto)
  weeklySlots?: WeeklySlotDto[];

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @IsNumber()
  hoursPerWeek?: number;

  @ApiProperty({ required: false, minimum: 0 })
  @IsOptional()
  @IsNumber()
  coefficient?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
