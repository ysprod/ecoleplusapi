// src/class/dto/class-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { SchoolResponseDto } from '../../school/dto/school-response.dto';
import { AcademicYearResponseDto } from 'src/academicyears/dto/academic-year-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ScheduleResponseDto } from 'src/schedule/dto/ScheduleResponse.dto';

export class ClassResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  classType: string;

  @ApiProperty()
  school: SchoolResponseDto;

  @ApiProperty({ type: [StudentResponseDto] })
  students: StudentResponseDto[];

  @ApiProperty({ type: [ScheduleResponseDto] })
  schedules: ScheduleResponseDto[];

  @ApiProperty({ type: [TeacherResponseDto] })
  teachers: TeacherResponseDto[];

  @ApiProperty()
  educator?: UserResponseDto;

  @ApiProperty()
  academicYear?: AcademicYearResponseDto;

  @ApiProperty({ type: [SubjectResponseDto] })
  subjects: SubjectResponseDto[];

  @ApiProperty()
  studentCount: number;

  @ApiProperty()
  teacherCount: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
