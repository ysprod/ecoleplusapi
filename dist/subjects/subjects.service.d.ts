import { Model } from 'mongoose';
import { Subject } from './schemas/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectsService {
    private subjectModel;
    constructor(subjectModel: Model<Subject>);
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    findAll(): Promise<Subject[]>;
    findBySchool(schoolId: string): Promise<Subject[]>;
    findOne(id: string): Promise<Subject>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject>;
    remove(id: string): Promise<void>;
    archive(id: string): Promise<Subject>;
    getSubjects(): string[];
}
