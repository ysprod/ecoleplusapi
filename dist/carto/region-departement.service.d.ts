import { RegionDepartementRepository } from './region-departement.repository';
export declare class RegionDepartementService {
    private readonly repo;
    constructor(repo: RegionDepartementRepository);
    fetchAll(): Promise<{
        regionsData: {
            [key: string]: import("./dtos/region.dto").RegionDTO;
        };
        departementData: {
            [regionId: string]: {
                [depId: string]: import("./dtos/departement.dto").DepartementDTO;
            };
        };
    }>;
}
