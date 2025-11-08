import { Document, Types } from 'mongoose';
export declare class Accountant {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    school: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export type AccountantDocument = Accountant & Document;
export declare const AccountantSchema: import("mongoose").Schema<Accountant, import("mongoose").Model<Accountant, any, any, any, Document<unknown, any, Accountant, any, {}> & Accountant & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Accountant, Document<unknown, {}, import("mongoose").FlatRecord<Accountant>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Accountant> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
