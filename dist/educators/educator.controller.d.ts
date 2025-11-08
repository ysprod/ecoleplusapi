import { EducatorService } from './educator.service';
export declare class EducatorController {
    private readonly educatorService;
    constructor(educatorService: EducatorService);
    getEducatorsBySchoolAndNiveau(schoolId: string, niveau: string): Promise<{
        data: {
            classes: import("./dto/educator-class.dto").EducatorClassDto[];
        };
    }>;
    getEducatorsBySchoolAndNiveauPath(schoolId: string, niveau: string): Promise<{
        data: {
            classes: import("./dto/educator-class.dto").EducatorClassDto[];
        };
    }>;
    getEducatorClasses(educatorId: string): Promise<import("./dto/educator-classes-response.dto").EducatorClassesResponseDto>;
    getSchoolClasseEducator(classId: string): Promise<import("./dto/educator-class.dto").EducatorClassDto | null>;
}
