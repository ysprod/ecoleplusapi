import { Document } from 'mongoose';
export declare class Car extends Document {
    matricule: string;
    carmodel: string;
    year: number;
    capacity: number;
    driverName: string;
    isActive: boolean;
}
export declare const CarSchema: import("mongoose").Schema<Car, import("mongoose").Model<Car, any, any, any, Document<unknown, any, Car, any, {}> & Car & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Car, Document<unknown, {}, import("mongoose").FlatRecord<Car>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Car> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
