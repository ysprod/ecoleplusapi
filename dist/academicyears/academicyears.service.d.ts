import { ClientSession, Model } from 'mongoose';
import { AcademicYear, AcademicYearDocument } from './schemas/academic-year.schema';
import { SchoolService } from '../school/school.service';
export declare class AcademicYearsService {
    private academicYearModel;
    private readonly schoolService;
    constructor(academicYearModel: Model<AcademicYearDocument>, schoolService: SchoolService);
    create(createDto: Partial<AcademicYear>, session?: ClientSession): Promise<AcademicYearDocument>;
    findAll(): Promise<AcademicYearDocument[]>;
    findOne(id: string): Promise<AcademicYearDocument | null>;
    remove(id: string): Promise<void>;
    addSchoolToAcademicYear(academicYearId: string, schoolId: string, session?: ClientSession): Promise<void>;
    removeSchoolFromAcademicYear(academicYearId: string, schoolId: string, session?: ClientSession): Promise<void>;
    deactivateOtherCurrentYears(userId: string, currentYearId: string, session?: ClientSession): Promise<void>;
    createWithSchoolTransaction(academicYearDto: any, schoolId: string): Promise<{
        academicYear: AcademicYearDocument;
    }>;
    getAcademicYearsWithSchools(userid?: any): Promise<AcademicYearDocument[]>;
    updateSchoolWithAcademicYear(data: {
        id: string;
    } & Partial<AcademicYear>): Promise<AcademicYearDocument>;
    deleteSchoolWithAcademicYear(params: {
        schoolId: string;
        academicYearId: string;
    }): Promise<{
        message: string;
        academicYearId: string;
        schoolId: string;
    }>;
    createSchoolWithAcademicYear(payload: {
        schoolId: string;
        academicYear: any;
    }): Promise<{
        academicYear: AcademicYearDocument;
    }>;
}
