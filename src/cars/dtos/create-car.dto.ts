import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toUpperCase())
  matricule: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  carmodel: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  capacity: number;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  @Transform(({ value }) => value.trim())
  driverName: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
