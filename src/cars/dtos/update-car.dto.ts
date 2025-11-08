import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsMongoId } from 'class-validator';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsMongoId()
  @IsOptional()
  id?: string;
}