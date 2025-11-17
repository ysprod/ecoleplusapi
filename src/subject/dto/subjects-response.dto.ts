import { ApiProperty } from '@nestjs/swagger';
import { SchoolResponseDto } from '../../school/dto/school-response.dto';
import { AcademicYearResponseDto } from '../../academicyears/dto/academic-year-response.dto';
import { ClassResponseDto } from '../../class/dto/class-response.dto';
import { TeacherResponseDto } from '../../teacher/dto/teacher-response.dto';

// DTO détaillé pour une matière (analogue à ClassResponseDto)
export class SubjectsResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  category?: string; // SubjectCategory

  @ApiProperty()
  creditHours: number;

  @ApiProperty({ required: false })
  coefficient?: number;

  @ApiProperty()
  isCore: boolean;

  @ApiProperty({ required: false })
  electiveGroup?: string;

  @ApiProperty({ type: [String], required: false })
  prerequisites?: string[];

  @ApiProperty({ type: [String], required: false })
  coRequisites?: string[];

  @ApiProperty({ type: [ClassResponseDto], required: false })
  classes?: ClassResponseDto[];

  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty({ required: false })
  color?: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: () => SchoolResponseDto })
  school: SchoolResponseDto;

  @ApiProperty({ type: () => AcademicYearResponseDto })
  academicYear: AcademicYearResponseDto;

  @ApiProperty({ required: false, type: () => TeacherResponseDto })
  teacher?: TeacherResponseDto;

  @ApiProperty({ required: false, type: () => TeacherResponseDto })
  mainTeacher?: TeacherResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
