import { PartialType } from '@nestjs/swagger';
import { CreateTermDto } from './create-term.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TermStatus } from '../schemas/term.schema';

export class UpdateTermDto extends PartialType(CreateTermDto) {}

export class UpdateTermStatusDto {
  @ApiProperty({ enum: TermStatus })
  @IsEnum(TermStatus)
  status: TermStatus;
}

export class PublishBulletinsDto {
  @ApiPropertyOptional({ description: 'Date de publication', example: '2025-12-30' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
