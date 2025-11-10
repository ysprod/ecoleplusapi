import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeacherDto } from './create-teacher.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
