import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SchoolDto } from '../../school/dto/school.dto';
import { TeacherDto } from '../../teacher/dto/teacher.dto';
import { UserDto } from '../../user/dto/user.dto';
import { ScheduleEventDTO } from '../../schedule/schedule/dto/schedule-event.dto';
import { StudentDto } from 'src/students/dto/student.dto';

export class ClassDto {
  @ApiPropertyOptional()
  id?: string;

  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  classType: string;

  @ApiPropertyOptional({ type: () => SchoolDto })
  school?: SchoolDto;

  @ApiPropertyOptional({ type: [StudentDto] })
  students?: StudentDto[];

  @ApiPropertyOptional({ type: [TeacherDto] })
  teachers?: TeacherDto[];

  @ApiPropertyOptional({ type: [ScheduleEventDTO] })
  schedules?: ScheduleEventDTO[];

  @ApiPropertyOptional({ type: () => UserDto })
  educator?: UserDto;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}
