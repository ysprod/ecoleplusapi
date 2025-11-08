import { EducatorRepository } from './educator.repository';
import { TeacherService } from '../teacher/teacher.service';
import { EducatorClassesResponseDto } from './dto/educator-classes-response.dto';
import { EducatorClassDto } from './dto/educator-class.dto';
import { TeacherResponseDto } from 'src/teacher/dto/teacher-response.dto';
export declare class EducatorService {
    private readonly educatorRepo;
    private readonly teacherService;
    constructor(educatorRepo: EducatorRepository, teacherService: TeacherService);
    getEducatorsByUserIds(userIds: string[]): Promise<TeacherResponseDto[]>;
    getEducatorClassesWithParams(schoolId: string, niveau?: string): Promise<EducatorClassesResponseDto>;
    getEducatorClasses(educatorId: string): Promise<EducatorClassesResponseDto>;
    getEducatorOfClass(classId: string): Promise<EducatorClassDto | null>;
    findClassesBySchoolAndNiveau(schoolId: string, niveau: string): Promise<EducatorClassDto[]>;
    private extractUniqueEducatorUserIds;
    private mapClassesWithEducators;
}
