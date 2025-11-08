import { Document, Types } from 'mongoose';
export declare class Class {
    name: string;
    level: string;
    school: Types.ObjectId;
    educator: Types.ObjectId;
}
export type ClassDocument = Class & Document;
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, Document<unknown, any, Class, any, {}> & Class & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, Document<unknown, {}, import("mongoose").FlatRecord<Class>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Class> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
