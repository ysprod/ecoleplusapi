import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { SchoolResponseDto } from './dto/school-response.dto';
import { User } from '../user/schemas/user.schema';
export declare class SchoolController {
    private readonly schoolService;
    constructor(schoolService: SchoolService);
    getEducatorsRedirect(schoolId?: string, niveau?: string): {
        url: string;
    };
    create(createSchoolDto: CreateSchoolDto, user: User): Promise<SchoolResponseDto>;
    update(updateSchoolDto: UpdateSchoolDto, user: User): Promise<SchoolResponseDto>;
    findAll(): Promise<SchoolResponseDto[]>;
    findById(id: string): Promise<SchoolResponseDto>;
    delete(id: string): Promise<void>;
    addTeacher(schoolId: string, teacherId: string): Promise<SchoolResponseDto>;
    addAcademicYear(schoolId: string, academicYearId: string): Promise<SchoolResponseDto>;
    findBySchoolAndLevel(schoolId: string, niveau: string): Promise<{
        classes: import("../class/schemas/class.schema").Class[];
        school: SchoolResponseDto;
    }>;
}
