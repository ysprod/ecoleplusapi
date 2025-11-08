import { Document, Types } from 'mongoose';
export declare class Coges {
    _id: Types.ObjectId;
    school: Types.ObjectId;
    parents: Types.ObjectId[];
    president: Types.ObjectId;
    treasurer: Types.ObjectId;
    secretary: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
export type CogesDocument = Coges & Document;
export declare const CogesSchema: import("mongoose").Schema<Coges, import("mongoose").Model<Coges, any, any, any, Document<unknown, any, Coges, any, {}> & Coges & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coges, Document<unknown, {}, import("mongoose").FlatRecord<Coges>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Coges> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
