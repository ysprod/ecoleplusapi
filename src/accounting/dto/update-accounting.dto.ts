import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAccountingDto } from './create-accounting.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAccountingDto extends PartialType(CreateAccountingDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}