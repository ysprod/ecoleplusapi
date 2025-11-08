import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Role {
  FOUNDER = "FOUNDER",
  DIRECTOR = "DIRECTOR",
  ACCOUNTANT = "ACCOUNTANT",
  TEACHER = "TEACHER",
  EDUCATOR = "EDUCATOR",
  CANTEEN_MANAGER = "CANTEEN_MANAGER",
  DRIVER = "DRIVER",
  PARENT = "PARENT",
  COGES_PRESIDENT = "COGES_PRESIDENT"
}

// Remplacez ceci par la vraie liste de profils si besoin
export type ProfileType = string;

export class UserDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  matricule?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  profileType: ProfileType;

  @ApiPropertyOptional({ type: Date })
  emailVerified?: Date | null;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional({ type: Date })
  birthDate?: Date;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  photo?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  school?: string;

  @ApiPropertyOptional()
  teacher?: string;

  @ApiPropertyOptional()
  parent?: string;

  @ApiPropertyOptional()
  accountant?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;

  @ApiPropertyOptional({ type: [String] })
  subjects?: string[];
}