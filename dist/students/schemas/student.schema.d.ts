import { Document, Types } from 'mongoose';
export declare enum Gender {
    M = "M",
    F = "F",
    O = "O"
}
export declare enum BloodGroup {
    A_POS = "A+",
    A_NEG = "A-",
    B_POS = "B+",
    B_NEG = "B-",
    AB_POS = "AB+",
    AB_NEG = "AB-",
    O_POS = "O+",
    O_NEG = "O-"
}
export declare class Student {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    birthPlace: string;
    email: string;
    gender: Gender;
    bloodGroup: BloodGroup;
    parentContact: string;
    class: Types.ObjectId;
    classLevel: string;
    photoUrl: string;
    healthNotes: string;
    healthIssues: string;
    forbiddenFoods: string;
    parents: Types.ObjectId[];
    grades: Types.ObjectId[];
    payments: Types.ObjectId[];
    matricule: string;
    nomPere?: string;
    prenomPere?: string;
    telephonePere?: string;
    professionPere?: string;
    nomMere?: string;
    prenomMere?: string;
    telephoneMere?: string;
    professionMere?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type StudentDocument = Student & Document;
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student, any, {}> & Student & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Student> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
