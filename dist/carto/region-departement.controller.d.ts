import { RegionDepartementService } from './region-departement.service';
export declare class RegionDepartementController {
    private readonly service;
    constructor(service: RegionDepartementService);
    getAll(): Promise<{
        timestamp: string;
        regionsData: {
            [key: string]: import("./dtos/region.dto").RegionDTO;
        };
        departementData: {
            [regionId: string]: {
                [depId: string]: import("./dtos/departement.dto").DepartementDTO;
            };
        };
    }>;
    methodNotAllowed(): {
        error: string;
    };
}
