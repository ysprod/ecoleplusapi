import { Document, Types } from 'mongoose';
export declare class Schedule {
    _id: Types.ObjectId;
    description: string;
    location: string;
    day: string;
    hour: string;
    subject: string;
    teacherName: string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    teacher?: Types.ObjectId;
    class?: Types.ObjectId;
    recurrence?: string;
    color?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type ScheduleDocument = Schedule & Document;
export declare const ScheduleSchema: import("mongoose").Schema<Schedule, import("mongoose").Model<Schedule, any, any, any, Document<unknown, any, Schedule, any, {}> & Schedule & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule, Document<unknown, {}, import("mongoose").FlatRecord<Schedule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Schedule> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
