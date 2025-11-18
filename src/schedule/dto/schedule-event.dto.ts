import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class ScheduleEventDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsString()
  day: string;

  @IsString()
  hour: string;

  @IsString()
  subject: string;

  @IsString()
  teacherName: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsString()
  teacher?: string;

  @IsOptional()
  @IsString()
  class?: string;

  @IsOptional()
  @IsEnum(['none', 'daily', 'weekly', 'monthly'])
  recurrence?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
