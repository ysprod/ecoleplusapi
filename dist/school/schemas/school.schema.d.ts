import { Document, Types } from 'mongoose';
import { Class } from '../../class/schemas/class.schema';
import { Teacher } from '../../teacher/schemas/teacher.schema';
import { Educator } from '../../educator/schemas/educator.schema';
import { Coges } from '../../coges/schemas/coges.schema';
import { User } from '../../user/schemas/user.schema';
import { AcademicYear } from 'src/academicyears/schemas/academic-year.schema';
export declare class School {
    _id: Types.ObjectId;
    email: string;
    nom: string;
    localite: string;
    directeur: string;
    address: string;
    phone: string;
    academicYear: string;
    educationLevel: string;
    location: string;
    dateCreation: Date;
    niveaux: string[];
    statut: string;
    matricule: string;
    user: Types.ObjectId;
    classes: Class[];
    teachers: Teacher[];
    academicYears: AcademicYear[];
    personnel: {
        enseignants: Teacher[];
        educateurs: Educator[];
        coges: Coges[];
    };
    services: {
        cantine: boolean;
        transport: boolean;
        activites: boolean;
    };
    frais: {
        transport: {
            montant: number;
            devise: string;
        };
        activites: {
            montant: number;
            devise: string;
        };
        cotisationCoges: {
            montant: number;
            devise: string;
        };
    };
    messagerie: {
        active: boolean;
        config?: {
            provider?: string;
            apiKey?: string;
        };
    };
    createdBy: User;
    updatedBy: User;
    createdAt?: Date;
    updatedAt?: Date;
}
export type SchoolDocument = School & Document;
export declare const SchoolSchema: import("mongoose").Schema<School, import("mongoose").Model<School, any, any, any, Document<unknown, any, School, any, {}> & School & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, School, Document<unknown, {}, import("mongoose").FlatRecord<School>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<School> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
