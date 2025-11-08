import { CantineRepository } from './cantine.repository';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';
import { SchoolService } from '../school/school.service';
export declare class CantineService {
    private readonly repository;
    private readonly schoolService;
    constructor(repository: CantineRepository, schoolService: SchoolService);
    getMenusBySchoolId(schoolId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createMenu(data: CantineCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateMenu(data: CantineUpdateDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cantine.schema").Cantine, {}, {}> & import("./schemas/cantine.schema").Cantine & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMenu(id: string): Promise<true>;
}
