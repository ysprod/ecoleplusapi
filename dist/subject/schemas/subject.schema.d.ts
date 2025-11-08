import { Document, Types } from 'mongoose';
export type SubjectStatus = 'active' | 'inactive' | 'archived';
export declare class Subject extends Document {
    name: string;
    code: string;
    school: Types.ObjectId;
    academicYear: Types.ObjectId;
    department?: Types.ObjectId;
    teacher?: Types.ObjectId;
    description?: string;
    creditHours: number;
    isCore: boolean;
    electiveGroup?: string;
    prerequisites?: Types.ObjectId[];
    coRequisites?: Types.ObjectId[];
    status: SubjectStatus;
}
export declare const SubjectSchema: import("mongoose").Schema<Subject, import("mongoose").Model<Subject, any, any, any, Document<unknown, any, Subject, any, {}> & Subject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subject, Document<unknown, {}, import("mongoose").FlatRecord<Subject>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Subject> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
