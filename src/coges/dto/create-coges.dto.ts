import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCogesDto {
  @ApiProperty({ description: 'ID de l\'école' })
  @IsString()
  schoolId: string;

  @ApiProperty({ 
    description: 'IDs des parents membres du COGES',
    type: [String],
    required: false,
    default: []
  })
  @IsArray()
  @IsOptional()
  parentIds?: string[];

  @ApiProperty({ description: 'ID du parent (singulier)', required: false })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: 'ID de l\'utilisateur (sera converti en Parent)', required: false })
  @IsString()
  @IsOptional()
  userId?: string;
}
