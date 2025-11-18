import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Directeur', description: 'Nom du rôle' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Responsable de la gestion de l\'école', description: 'Description du rôle', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;

  @ApiProperty({ example: ['permission1', 'permission2'], description: 'Liste des IDs de permissions' })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @ApiProperty({ example: false, description: 'Indique si c\'est un rôle système (non modifiable)', required: false })
  @IsBoolean()
  @IsOptional()
  isSystemRole?: boolean;
}
