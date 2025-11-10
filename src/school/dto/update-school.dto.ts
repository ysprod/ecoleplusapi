import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
