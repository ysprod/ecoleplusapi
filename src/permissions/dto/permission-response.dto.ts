import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({
    description: 'Permission ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Permission name',
    example: 'user:create',
  })
  name: string;

  @ApiProperty({
    description: 'Permission description',
    example: 'Create new users',
  })
  description: string;

  @ApiProperty({
    description: 'Resource this permission applies to',
    example: 'user',
  })
  resource: string;

  @ApiProperty({
    description: 'Action this permission allows',
    example: 'create',
  })
  action: string;

  @ApiProperty({
    description: 'Permission category',
    example: 'User Management',
  })
  category: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
