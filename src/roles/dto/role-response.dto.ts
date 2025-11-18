import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    description: 'Role ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Role name',
    example: 'Administrator',
  })
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Full system access',
  })
  description: string;

  @ApiProperty({
    description: 'Associated permissions',
    type: [String],
    example: ['user:create', 'user:read', 'user:update', 'user:delete'],
  })
  permissions: string[];

  @ApiProperty({
    description: 'Whether this is a system role (cannot be deleted)',
    example: false,
  })
  isSystemRole: boolean;

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
