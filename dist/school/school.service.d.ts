import { ClientSession, Model } from 'mongoose';
import { Class } from '../class/schemas/class.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolResponseDto } from './dto/school-response.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './schemas/school.schema';
export declare class SchoolService {
    private schoolModel;
    constructor(schoolModel: Model<School>);
    create(createSchoolDto: CreateSchoolDto, userId: string, session?: ClientSession): Promise<SchoolResponseDto>;
    update(updateSchoolDto: UpdateSchoolDto, userId: string): Promise<SchoolResponseDto>;
    findAll(): Promise<SchoolResponseDto[]>;
    findById(id: string): Promise<SchoolResponseDto>;
    findByEmail(email: string): Promise<SchoolResponseDto | null>;
    delete(id: string): Promise<void>;
    addTeacher(schoolId: string, teacherId: string, session?: ClientSession): Promise<SchoolResponseDto>;
    addAcademicYear(schoolId: string, academicYearId: string, session?: ClientSession): Promise<SchoolResponseDto>;
    addClass(schoolId: string, classId: string, session?: ClientSession): Promise<void>;
    findBySchoolAndLevel(schoolId: string, niveau: string): Promise<{
        classes: Class[];
        school: SchoolResponseDto;
    }>;
    addTeacherIfNotExists(schoolId: string, teacherId: string): Promise<void>;
    private mapToResponseDto;
}
