import { SchoolDto } from 'src/school/dto/school.dto';
import { ClassDto } from '../../classes/dto/class.dto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { GradeDto } from 'src/grade/dto/grade.dto';

export class TeacherDto {
  @ApiPropertyOptional()
  _id?: string;

  @ApiPropertyOptional({ type: () => UserDto })
  user?: UserDto;

  @ApiPropertyOptional()
  matricule?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  fullName?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  birthDate?: string;

  @ApiPropertyOptional({ type: [String] })
  subjects?: string[];

  @ApiPropertyOptional({ type: [SchoolDto] })
  schools?: SchoolDto[];

  @ApiPropertyOptional({ type: [ClassDto] })
  classes?: ClassDto[];

  @ApiPropertyOptional({ type: [GradeDto] })
  grades?: GradeDto[];

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
