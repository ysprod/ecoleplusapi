import { SchoolDto } from 'src/school/dto/school.dto';
import { ClassDto } from '../../classes/dto/class.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { GradeDto } from 'src/grade/dto/grade.dto';
export declare class TeacherDto {
    _id?: string;
    user?: UserDto;
    matricule?: string;
    lastName?: string;
    firstName?: string;
    fullName?: string;
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    birthDate?: string;
    subjects?: string[];
    schools?: SchoolDto[];
    classes?: ClassDto[];
    grades?: GradeDto[];
    createdAt?: string;
    updatedAt?: string;
}
