import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createSubjectDto: CreateSubjectDto): Promise<import("./schemas/subject.schema").Subject>;
    findAll(schoolId?: string): Promise<import("./schemas/subject.schema").Subject[]>;
    findOne(id: string): Promise<import("./schemas/subject.schema").Subject>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<import("./schemas/subject.schema").Subject>;
    remove(id: string): Promise<void>;
    archive(id: string): Promise<import("./schemas/subject.schema").Subject>;
}
