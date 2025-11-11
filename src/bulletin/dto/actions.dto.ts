import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class GenerateBulletinDto {
  @ApiPropertyOptional({ description: 'User ID who generated the bulletin' })
  @IsMongoId()
  @IsOptional()
  generatedBy?: string;
}

export class PublishBulletinDto {
  @ApiPropertyOptional({ description: 'User ID who published the bulletin' })
  @IsMongoId()
  @IsOptional()
  publishedBy?: string;

  @ApiPropertyOptional({ description: 'Optional PDF URL at publish time' })
  @IsString()
  @IsOptional()
  pdfUrl?: string;
}

export class ArchiveBulletinDto {
  @ApiPropertyOptional({ description: 'Optional reason for archiving' })
  @IsString()
  @IsOptional()
  reason?: string;
}
