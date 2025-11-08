import { Document, Types } from 'mongoose';
export declare enum GradeType {
    EXAM = "EXAM",
    TEST = "TEST",
    HOMEWORK = "HOMEWORK",
    ORAL = "ORAL",
    OTHER = "OTHER"
}
export declare class Grade {
    _id: Types.ObjectId;
    student: Types.ObjectId;
    teacher: Types.ObjectId;
    subject?: Types.ObjectId;
    class?: Types.ObjectId;
    value: number;
    type: GradeType;
    trimester: number;
    comments?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type GradeDocument = Grade & Document;
export declare const GradeSchema: import("mongoose").Schema<Grade, import("mongoose").Model<Grade, any, any, any, Document<unknown, any, Grade, any, {}> & Grade & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Grade, Document<unknown, {}, import("mongoose").FlatRecord<Grade>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Grade> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
