import { Document, Types } from 'mongoose';
export type AcademicYearDocument = AcademicYear & Document;
export declare class AcademicYear {
    user: Types.ObjectId;
    name: string;
    startDate: Date;
    endDate: Date;
    schools: Types.ObjectId[];
    isCurrent: boolean;
    status: string;
    description?: string;
    isArchived: boolean;
}
export declare const AcademicYearSchema: import("mongoose").Schema<AcademicYear, import("mongoose").Model<AcademicYear, any, any, any, Document<unknown, any, AcademicYear, any, {}> & AcademicYear & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AcademicYear, Document<unknown, {}, import("mongoose").FlatRecord<AcademicYear>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AcademicYear> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
