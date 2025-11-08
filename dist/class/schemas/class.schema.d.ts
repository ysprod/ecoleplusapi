import { Document, Types } from 'mongoose';
export declare class Class {
    _id: Types.ObjectId;
    name: string;
    level: string;
    classType: string;
    school: Types.ObjectId;
    students: Types.ObjectId[];
    schedules: Types.ObjectId[];
    teachers: Types.ObjectId[];
    educator: Types.ObjectId;
    academicYear: Types.ObjectId;
    subjects: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    getFullName: () => string;
}
export type ClassDocument = Class & Document;
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, Document<unknown, any, Class, any, {}> & Class & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, Document<unknown, {}, import("mongoose").FlatRecord<Class>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Class> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
