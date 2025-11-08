import { GradeType } from '../schemas/grade.schema';
import { ClassResponseDto } from 'src/class/dto/class-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { SubjectResponseDto } from 'src/subject/dto/subject-response.dto';
export declare class GradeResponseDto {
    id: string;
    student: StudentResponseDto;
    teacher: TeacherResponseDto;
    value: number;
    type: GradeType;
    trimester: number;
    comments?: string;
    subject?: SubjectResponseDto;
    class?: ClassResponseDto;
    createdAt: Date;
    updatedAt: Date;
}
