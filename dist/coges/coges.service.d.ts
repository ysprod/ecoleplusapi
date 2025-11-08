import { Model, Types } from 'mongoose';
import { Coges, CogesDocument } from './schemas/coges.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ParentDocument } from '../parent/schemas/parent.schema';
import { CreateCogesDto } from './dto/create-coges.dto';
export declare class CogesService {
    private cogesModel;
    private userModel;
    private parentModel;
    constructor(cogesModel: Model<CogesDocument>, userModel: Model<UserDocument>, parentModel: Model<ParentDocument>);
    findBySchoolId(schoolId: string): Promise<(import("mongoose").Document<unknown, {}, CogesDocument, {}, {}> & Coges & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(dto: CreateCogesDto): Promise<Coges>;
    searchParentByPhone(phone: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    addParent(cogesId: string, parentId: string): Promise<Coges>;
    deleteBySchoolId(schoolId: string): Promise<import("mongodb").DeleteResult>;
}
