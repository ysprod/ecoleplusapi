import { Document, Types } from 'mongoose';
export declare class Teacher {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    matricule: string;
    lastName: string;
    firstName: string;
    email: string;
    gender: string;
    phone: string;
    birthDate: Date;
    subjects: string[];
    classes: Types.ObjectId[];
    schools: Types.ObjectId[];
    grades: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type TeacherDocument = Teacher & Document;
export declare const TeacherSchema: import("mongoose").Schema<Teacher, import("mongoose").Model<Teacher, any, any, any, Document<unknown, any, Teacher, any, {}> & Teacher & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Teacher, Document<unknown, {}, import("mongoose").FlatRecord<Teacher>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Teacher> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
