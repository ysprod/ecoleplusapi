import { Document, Types } from 'mongoose';
import { School } from '../../school/schemas/school.schema';
import { Teacher } from '../../teacher/schemas/teacher.schema';
import { Parent } from '../../parent/schemas/parent.schema';
import { Accountant } from '../../accountant/schemas/accountant.schema';
export type UserDocument = User & Document;
export declare const ROLES: string[];
export declare const PROFILE_TYPES: string[];
export declare class User {
    _id: Types.ObjectId;
    email: string;
    matricule: string;
    firstName: string;
    lastName: string;
    gender: string;
    password: string;
    role: string;
    profileType: string;
    emailVerified: Date;
    phone: string;
    status: string;
    birthDate: Date;
    photo: string;
    avatar: string;
    school: School;
    teacher: Teacher;
    parent: Parent;
    accountant: Accountant;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
