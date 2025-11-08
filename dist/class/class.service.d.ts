import { Model, Types } from 'mongoose';
import { SchoolResponseDto } from 'src/school/dto/school-response.dto';
import { StudentResponseDto } from 'src/students/dto/student-response.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
import { SchoolService } from '../school/school.service';
import { ClassResponseDto } from './dto/class-response.dto';
import { ClassStatisticsDto } from './dto/class-stats.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassDocument } from './schemas/class.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { ClassDetail } from './dto/class-detail.dto';
export declare class ClassService {
    private classModel;
    private schoolService;
    private studentModel;
    constructor(classModel: Model<ClassDocument>, schoolService: SchoolService, studentModel: Model<StudentDocument>);
    getAcademicClasses2(schoolId: string, classType?: string, niveau?: string): Promise<any[]>;
    getSchoolForClass(classId: string): Promise<SchoolResponseDto | null>;
    getStudentsForClass(classId: string): Promise<StudentResponseDto[]>;
    getTeachersForClass(classId: string): Promise<TeacherResponseDto[]>;
    getAcademicClasses(schoolId: string, classType?: string, niveau?: string): Promise<any[]>;
    private mapToResponseDto;
    getSchoolStudents(schoolId: string, options?: {
        page?: number;
        limit?: number;
        niveau?: string;
    }): Promise<{
        students: (import("mongoose").Document<unknown, {}, StudentDocument, {}, {}> & Student & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
    find(params?: {
        schoolId?: string;
        niveau?: string;
    }): Promise<ClassResponseDto[]>;
    create(createClassDto: CreateClassDto): Promise<ClassResponseDto>;
    findAll(): Promise<ClassResponseDto[]>;
    findById(id: string): Promise<ClassResponseDto>;
    findBySchool(schoolId: string): Promise<ClassResponseDto[]>;
    findBySchoolAndLevel(schoolId: string, level: string): Promise<ClassResponseDto[]>;
    update(id: string, updateClassDto: UpdateClassDto, userId: string): Promise<ClassResponseDto>;
    remove(id: string): Promise<void>;
    addStudent(classId: string, studentId: string): Promise<ClassResponseDto>;
    addTeacherToClass(classId: string, teacherId: string): Promise<void>;
    assignEducator(classId: string, educatorId: string): Promise<ClassResponseDto>;
    getClassStats(schoolId?: string): Promise<ClassStatisticsDto>;
    private mapStatsResult;
    removeStudent(classId: string, studentId: string): Promise<void>;
    addTeacher(classId: string, teacherId: string): Promise<ClassResponseDto>;
    getTeacherClasses(teacherId: string, schoolId?: string): Promise<ClassDetail[]>;
}
