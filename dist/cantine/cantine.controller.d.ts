import { CantineService } from './cantine.service';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';
export declare class CantineController {
    private readonly cantineService;
    constructor(cantineService: CantineService);
    createCantineMenu(data: any): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getCantineMenus(schoolId: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    createMenu(data: CantineCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateMenu(id: string, data: CantineUpdateDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMenu(id: string): Promise<true>;
}
