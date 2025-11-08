import { Model } from 'mongoose';
import { Region } from './schemas/region.schema';
import { Departement } from './schemas/departement.schema';
import { RegionDTO } from './dtos/region.dto';
import { DepartementDTO } from './dtos/departement.dto';
export interface IRegionDepartementRepository {
    getRegions(): Promise<{
        [key: string]: RegionDTO;
    }>;
    getDepartements(): Promise<{
        [regionId: string]: {
            [depId: string]: DepartementDTO;
        };
    }>;
}
export declare class RegionDepartementRepository implements IRegionDepartementRepository {
    private regionModel;
    private departementModel;
    constructor(regionModel: Model<Region>, departementModel: Model<Departement>);
    getRegions(): Promise<{
        [key: string]: RegionDTO;
    }>;
    getDepartements(): Promise<{
        [regionId: string]: {
            [depId: string]: DepartementDTO;
        };
    }>;
}
