import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAccountingDto {
  @ApiProperty({ required: false, type: String, example: '1990-01-01' })
  @Type(() => Date) // transforme string en Date
  @IsDate({
    message: 'birthDate must be a valid Date (ISO string: YYYY-MM-DD)',
  })
  @IsOptional()
  date?: Date;
  // @ApiProperty({ required: false, default: new Date() })
  // @IsDate()
  // date?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: ['income', 'expense'] })
  @IsEnum(['income', 'expense'])
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  user?: string;

  @ApiProperty({ enum: ['cash', 'check', 'transfer', 'card'] })
  @IsEnum(['cash', 'check', 'transfer', 'card'])
  paymentMethod: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  school: string;
}
