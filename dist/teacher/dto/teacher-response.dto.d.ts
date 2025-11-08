import { ClassResponseDto } from '../../class/dto/class-response.dto';
import { SchoolResponseDto } from '../../school/dto/school-response.dto';
import { GradeResponseDto } from '../../grade/dto/grade-response.dto';
import { UserResponseDto } from '../../user/dto/user-response.dto';
export declare class TeacherResponseDto {
    id: string;
    user: UserResponseDto;
    matricule: string;
    lastName: string;
    firstName: string;
    fullName: string;
    email: string;
    gender: string;
    phone: string;
    birthDate: Date;
    subjects: string[];
    classes: ClassResponseDto[];
    schools: SchoolResponseDto[];
    grades: GradeResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
