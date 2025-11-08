import { Document, Types } from 'mongoose';
export declare class Cantine extends Document {
    date: Date;
    school: Types.ObjectId;
    menu: {
        entree?: string;
        platPrincipal: string;
        accompagnement?: string;
        dessert?: string;
    };
    prix: number;
    nombreRepas: number;
    allergenes: string[];
    createdAt: Date;
}
export declare const CantineSchema: import("mongoose").Schema<Cantine, import("mongoose").Model<Cantine, any, any, any, Document<unknown, any, Cantine, any, {}> & Cantine & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cantine, Document<unknown, {}, import("mongoose").FlatRecord<Cantine>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Cantine> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
