import { Document, Types } from 'mongoose';
export declare class Educator {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    school: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthDate: Date;
    subjects: string[];
    classes: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type EducatorDocument = Educator & Document;
export declare const EducatorSchema: import("mongoose").Schema<Educator, import("mongoose").Model<Educator, any, any, any, Document<unknown, any, Educator, any, {}> & Educator & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Educator, Document<unknown, {}, import("mongoose").FlatRecord<Educator>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Educator> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
