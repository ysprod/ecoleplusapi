import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Permission name',
    example: 'user:create',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Permission description',
    example: 'Create new users',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Resource this permission applies to',
    example: 'user',
  })
  @IsString()
  @IsNotEmpty()
  resource: string;

  @ApiProperty({
    description: 'Action this permission allows',
    example: 'create',
  })
  @IsString()
  @IsNotEmpty()
  action: string;

  @ApiProperty({
    description: 'Permission category',
    example: 'User Management',
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;
}
