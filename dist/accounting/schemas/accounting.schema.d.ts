import { Document, Types } from 'mongoose';
import { School } from '../../school/schemas/school.schema';
export type AccountingDocument = Accounting & Document;
export declare class Accounting {
    date: Date;
    description: string;
    amount: number;
    type: string;
    category: string;
    paymentMethod: string;
    reference: string;
    school: School;
    user: Types.ObjectId;
}
export declare const AccountingSchema: import("mongoose").Schema<Accounting, import("mongoose").Model<Accounting, any, any, any, Document<unknown, any, Accounting, any, {}> & Accounting & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Accounting, Document<unknown, {}, import("mongoose").FlatRecord<Accounting>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Accounting> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
