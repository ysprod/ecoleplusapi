import { SchoolDto } from '../../school/dto/school.dto';
import { TeacherDto } from '../../teacher/dto/teacher.dto';
import { UserDto } from '../../user/dto/user.dto';
import { ScheduleEventDTO } from '../../schedule/schedule/dto/schedule-event.dto';
import { StudentDto } from 'src/students/dto/student.dto';
export declare class ClassDto {
    id?: string;
    _id?: string;
    name: string;
    level: string;
    classType: string;
    school?: SchoolDto;
    students?: StudentDto[];
    teachers?: TeacherDto[];
    schedules?: ScheduleEventDTO[];
    educator?: UserDto;
    createdAt?: string;
    updatedAt?: string;
}
