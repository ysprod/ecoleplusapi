import { SchoolResponseDto } from '../../school/dto/school-response.dto';
import { AcademicYearResponseDto } from 'src/academicyears/dto/academic-year-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { ScheduleResponseDto } from 'src/schedule/dto/ScheduleResponse.dto';
export declare class ClassResponseDto {
    id: string;
    name: string;
    level: string;
    classType: string;
    school: SchoolResponseDto;
    students: StudentResponseDto[];
    schedules: ScheduleResponseDto[];
    teachers: TeacherResponseDto[];
    educator?: UserResponseDto;
    academicYear?: AcademicYearResponseDto;
    subjects: SubjectResponseDto[];
    studentCount: number;
    teacherCount: number;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}
