import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassResponseDto } from './dto/class-response.dto';
import { User } from '../user/schemas/user.schema';
import { ClassStatisticsDto } from './dto/class-stats.dto';
import { Types } from 'mongoose';
export declare class ClassController {
    private readonly classService;
    getClassStats(): Promise<{
        data: ClassStatisticsDto;
    }>;
    getSchoolStudents(schoolId: string, niveau?: string, page?: number, limit?: number): Promise<{
        students: (import("mongoose").Document<unknown, {}, import("../students/schemas/student.schema").StudentDocument, {}, {}> & import("../students/schemas/student.schema").Student & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    constructor(classService: ClassService);
    create(createClassDto: CreateClassDto): Promise<ClassResponseDto>;
    find(schoolId?: string, niveau?: string): Promise<ClassResponseDto[]>;
    findById(id: string): Promise<ClassResponseDto>;
    update(id: string, updateClassDto: UpdateClassDto, user: User): Promise<ClassResponseDto>;
    remove(id: string): Promise<void>;
    addStudent(classId: string, studentId: string): Promise<ClassResponseDto>;
    addTeacher(classId: string, teacherId: string): Promise<ClassResponseDto>;
    assignEducator(classId: string, educatorId: string): Promise<ClassResponseDto>;
    getSchoolClassStats(schoolId: string): Promise<ClassStatisticsDto>;
    getGlobalClassStats(): Promise<ClassStatisticsDto>;
    getAcademicClasses(schoolId: string, classType?: string, niveau?: string): Promise<{
        data: any[];
    }>;
    getClassesBySchoolAndNiveau(schoolId: string, niveau: string): Promise<ClassResponseDto[]>;
    getClassDetails(id: string): Promise<{
        classe: ClassResponseDto;
        school: import("../school/dto/school-response.dto").SchoolResponseDto | null;
        students: import("../students/dto/student-response.dto").StudentResponseDto[];
        teachers: import("../teacher/dto/teacher-response.dto").TeacherResponseDto[];
    }>;
    getClassStudents(id: string): Promise<{
        classId: string;
        students: import("../students/dto/student-response.dto").StudentResponseDto[];
        count: number;
    }>;
}
