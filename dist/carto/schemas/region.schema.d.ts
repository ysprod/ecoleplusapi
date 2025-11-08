import { Document } from 'mongoose';
export declare class Region extends Document {
    a?: string;
    b?: string;
    c: string;
    d?: string;
    e?: string;
    f?: string;
    g: string;
    h?: string;
    i?: string;
    l?: string;
    m?: string;
}
export declare const RegionSchema: import("mongoose").Schema<Region, import("mongoose").Model<Region, any, any, any, Document<unknown, any, Region, any, {}> & Region & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Region, Document<unknown, {}, import("mongoose").FlatRecord<Region>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Region> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
