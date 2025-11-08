import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateParentDto } from './create-parent.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateParentDto extends PartialType(CreateParentDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}