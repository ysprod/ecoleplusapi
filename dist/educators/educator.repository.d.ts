import { ClassDocument } from '../classes/schemas/class.schema';
import { Model } from 'mongoose';
import { EducatorClassDto } from './dto/educator-class.dto';
export declare class EducatorRepository {
    private classModel;
    constructor(classModel: Model<ClassDocument>);
    private mapToEducatorClassDto;
    getClassesWithEducators(schoolId: string, niveau?: string): Promise<EducatorClassDto[]>;
    getClassesByEducator(educatorId: string): Promise<EducatorClassDto[]>;
    getClassEducator(classId: string): Promise<EducatorClassDto | null>;
}
