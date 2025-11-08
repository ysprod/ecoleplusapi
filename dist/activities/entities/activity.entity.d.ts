import { Document, Schema as MongooseSchema } from 'mongoose';
import { School } from 'src/school/schemas/school.schema';
import { User } from 'src/user/schemas/user.schema';
export type ActivityCategory = 'sport' | 'art' | 'musique' | 'science' | 'autre';
export type ActivityLevel = 'débutant' | 'intermédiaire' | 'avancé';
export type DayOfWeek = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi';
export declare class Activity extends Document {
    school: School;
    name: string;
    description: string;
    category: ActivityCategory;
    level: ActivityLevel;
    schedule: {
        day: DayOfWeek;
        startTime: string;
        endTime: string;
    };
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    animator: User;
    price: number;
    isActive: boolean;
    createdAt: Date;
}
export declare const ActivitySchema: MongooseSchema<Activity, import("mongoose").Model<Activity, any, any, any, Document<unknown, any, Activity, any, {}> & Activity & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Activity, Document<unknown, {}, import("mongoose").FlatRecord<Activity>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Activity> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
