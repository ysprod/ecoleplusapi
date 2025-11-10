import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  matricule: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  profileType: string;

  @ApiProperty()
  emailVerified: Date;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
