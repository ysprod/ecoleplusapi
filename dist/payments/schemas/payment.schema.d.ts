import { Document, Types } from 'mongoose';
export type PaymentDocument = Payment & Document;
export declare enum PaymentType {
    TUITION = "TUITION",
    CANTEEN = "CANTEEN",
    TRANSPORT = "TRANSPORT",
    ACTIVITY = "ACTIVITY",
    COGES = "COGES"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    LATE = "LATE",
    PARTIAL = "PARTIAL"
}
export declare class Payment {
    amount: number;
    type: PaymentType;
    status: PaymentStatus;
    student: Types.ObjectId;
    parent: Types.ObjectId;
    dueDate: Date;
    paidAt?: Date;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, Document<unknown, any, Payment, any, {}> & Payment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
