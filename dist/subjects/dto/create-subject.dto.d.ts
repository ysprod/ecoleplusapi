export declare class CreateSubjectDto {
    name: string;
    code: string;
    school: string;
    academicYear: string;
    department?: string;
    teacher?: string;
    description?: string;
    creditHours: number;
    isCore: boolean;
    electiveGroup?: string;
    prerequisites?: string[];
    coRequisites?: string[];
    status?: string;
}
