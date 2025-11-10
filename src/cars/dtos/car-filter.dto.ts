import { IsBooleanString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CarFilterDto {
  @IsBooleanString()
  @IsOptional()
  isActive?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  model?: string;
}
