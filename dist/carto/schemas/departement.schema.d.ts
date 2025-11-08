import { Document, Types } from 'mongoose';
export declare class Departement extends Document {
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    e?: string;
    f?: string;
    g?: string;
    h?: string;
    i?: string;
    l?: string;
    m?: string;
    regionId?: Types.ObjectId;
}
export declare const DepartementSchema: import("mongoose").Schema<Departement, import("mongoose").Model<Departement, any, any, any, Document<unknown, any, Departement, any, {}> & Departement & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Departement, Document<unknown, {}, import("mongoose").FlatRecord<Departement>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Departement> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
