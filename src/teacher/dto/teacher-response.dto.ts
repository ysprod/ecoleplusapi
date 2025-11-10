import { ApiProperty } from '@nestjs/swagger';
import { ClassResponseDto } from '../../class/dto/class-response.dto';
import { SchoolResponseDto } from '../../school/dto/school-response.dto';
import { GradeResponseDto } from '../../grade/dto/grade-response.dto';
import { UserResponseDto } from '../../user/dto/user-response.dto';

export class TeacherResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  matricule: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty({ type: [String] })
  subjects: string[];

  @ApiProperty({ type: [ClassResponseDto] })
  classes: ClassResponseDto[];

  @ApiProperty({ type: [SchoolResponseDto] })
  schools: SchoolResponseDto[];

  @ApiProperty({ type: [GradeResponseDto] })
  grades: GradeResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
