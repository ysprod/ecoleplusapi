import { CogesService } from './coges.service';
import { CreateCogesDto } from './dto/create-coges.dto';
export declare class CogesController {
    private readonly cogesService;
    constructor(cogesService: CogesService);
    searchParent(phone: string): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").UserDocument, {}, {}> & import("../user/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findBySchoolId(schoolId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/coges.schema").CogesDocument, {}, {}> & import("./schemas/coges.schema").Coges & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(createCogesDto: CreateCogesDto): Promise<import("./schemas/coges.schema").Coges>;
    addParent(cogesId: string, parentId: string): Promise<import("./schemas/coges.schema").Coges>;
    deleteBySchoolId(schoolId: string): Promise<import("mongodb").DeleteResult>;
}
