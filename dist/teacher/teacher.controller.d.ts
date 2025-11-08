import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherResponseDto } from './dto/teacher-response.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherService } from './teacher.service';
import { User } from '../user/schemas/user.schema';
import { PaginatedTeachersResponseDto } from './dto/paginated-teachers.dto';
export declare class TeacherController {
    private readonly teacherService;
    constructor(teacherService: TeacherService);
    findSingleTeacher(matricule: string): Promise<{
        data: null;
    } | {
        data: TeacherResponseDto;
    }>;
    createOrUpdateTeacher(body: CreateTeacherDto): Promise<{
        success: boolean;
        data: TeacherResponseDto;
    }>;
    getAloneTeacher(id: string): Promise<{
        data: TeacherResponseDto;
    }>;
    create(createTeacherDto: CreateTeacherDto, user: User): Promise<TeacherResponseDto>;
    findAll(): Promise<TeacherResponseDto[]>;
    findBySchool(schoolId: string, page?: number, limit?: number): Promise<PaginatedTeachersResponseDto>;
    findById(id: string): Promise<TeacherResponseDto>;
    findByMatricule(matricule: string): Promise<TeacherResponseDto>;
    getProfile(req: any): Promise<TeacherResponseDto>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<TeacherResponseDto>;
    updateSubjects(id: string, subjects: string[]): Promise<TeacherResponseDto>;
    remove(id: string): Promise<void>;
    assignTeacherToClass(payload: {
        matricule: string;
        teacherId: string;
        subjects: string[];
        classId: string;
        schoolId: string;
    }): Promise<import("../class/dto/class-detail.dto").ClassDetail[]>;
}
