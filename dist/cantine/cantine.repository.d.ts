import { Model, Types } from 'mongoose';
import { Cantine } from './schemas/cantine.schema';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';
export declare class CantineRepository {
    private cantineModel;
    constructor(cantineModel: Model<Cantine>);
    getMenusBySchool(schoolId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, Cantine, {}, {}> & Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createMenu(menuData: CantineCreateDto): Promise<import("mongoose").Document<unknown, {}, Cantine, {}, {}> & Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateMenu(id: Types.ObjectId, updateData: CantineUpdateDto): Promise<(import("mongoose").Document<unknown, {}, Cantine, {}, {}> & Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteMenu(id: Types.ObjectId): Promise<boolean>;
}
