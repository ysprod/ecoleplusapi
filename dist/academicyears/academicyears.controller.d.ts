import { SchoolService } from '../school/school.service';
import { AcademicYearsService } from './academicyears.service';
import { AcademicYear } from './schemas/academic-year.schema';
export declare class AcademicYearsController {
    private readonly academicYearsService;
    private readonly schoolService;
    constructor(academicYearsService: AcademicYearsService, schoolService: SchoolService);
    listAll(userId?: string): Promise<{
        success: boolean;
        hasData: boolean;
        data: import("./schemas/academic-year.schema").AcademicYearDocument[];
    }>;
    createSchoolWithAcademicYear(payload: any): Promise<{
        success: boolean;
        data: {
            academicYear: import("./schemas/academic-year.schema").AcademicYearDocument;
        };
    }>;
    updateSchoolWithAcademicYear(data: {
        id: string;
    } & Partial<AcademicYear>): Promise<{
        success: boolean;
        data: import("./schemas/academic-year.schema").AcademicYearDocument;
    }>;
    patchSchoolWithAcademicYear(data: {
        id: string;
    } & Partial<AcademicYear>): Promise<{
        success: boolean;
        data: import("./schemas/academic-year.schema").AcademicYearDocument;
    }>;
    deleteSchoolWithAcademicYear(schoolId: string, academicYearId: string): Promise<{
        success: boolean;
        data: {
            message: string;
            academicYearId: string;
            schoolId: string;
        };
    }>;
    findOne(id: string): Promise<import("./schemas/academic-year.schema").AcademicYearDocument | null>;
    remove(id: string): Promise<void>;
    validate(payload: any): Promise<{
        _id: any;
        email: any;
        role: any;
    }>;
}
