import { Document, Types } from 'mongoose';
export declare class Parent {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    students: Types.ObjectId[];
    payments: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
export type ParentDocument = Parent & Document;
export declare const ParentSchema: import("mongoose").Schema<Parent, import("mongoose").Model<Parent, any, any, any, Document<unknown, any, Parent, any, {}> & Parent & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Parent, Document<unknown, {}, import("mongoose").FlatRecord<Parent>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Parent> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
