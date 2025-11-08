// activity-create.dto.ts
import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsObject, ValidateNested, IsMongoId, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleDto {
  @IsEnum(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'])
  day: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

export class ActivityCreateDto {
  @IsMongoId()
  school: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['sport', 'art', 'musique', 'science', 'autre'])
  category?: string;

  @IsOptional()
  @IsEnum(['débutant', 'intermédiaire', 'avancé'])
  level?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule: ScheduleDto;

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxParticipants?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  currentParticipants?: number;
  
 @IsOptional()
  @IsMongoId()
  animator: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}