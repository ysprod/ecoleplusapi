// src/class/dto/update-class.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
