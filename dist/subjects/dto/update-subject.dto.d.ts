import { CreateSubjectDto } from './create-subject.dto';
declare const UpdateSubjectDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSubjectDto>>;
export declare class UpdateSubjectDto extends UpdateSubjectDto_base {
    name?: string;
    code?: string;
    school?: string;
    academicYear?: string;
    department?: string;
    teacher?: string;
    description?: string;
    creditHours?: number;
    isCore?: boolean;
    electiveGroup?: string;
    prerequisites?: string[];
    coRequisites?: string[];
    status?: string;
}
export {};
