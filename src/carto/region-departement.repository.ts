
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region } from './schemas/region.schema';
import { Departement } from './schemas/departement.schema';
import { RegionDTO } from './dtos/region.dto';
import { DepartementDTO } from './dtos/departement.dto';

/**
 * Interface for the RegionDepartementRepository, for abstraction and testability.
 */
export interface IRegionDepartementRepository {
  getRegions(): Promise<{ [key: string]: RegionDTO }>;
  getDepartements(): Promise<{ [regionId: string]: { [depId: string]: DepartementDTO } }>;
}

/**
 * Repository for accessing regions and departements, returning data in frontend-compatible format.
 */
@Injectable()
export class RegionDepartementRepository implements IRegionDepartementRepository {
  constructor(
    @InjectModel(Region.name) private regionModel: Model<Region>,
    @InjectModel(Departement.name) private departementModel: Model<Departement>,
  ) {}

  /**
   * Returns all regions as an object keyed by region id (g).
   */
  async getRegions(): Promise<{ [key: string]: RegionDTO }> {
    const regions = await this.regionModel.find().lean();
    // Map to { [g]: region }
    const result: { [key: string]: RegionDTO } = {};
    for (const region of regions) {
      if (region.g) {
        result[region.g] = region as RegionDTO;
      }
    }
    return result;
  }

  /**
   * Returns all departements as an object: { [regionId]: { [depId]: departement } }
   */
  async getDepartements(): Promise<{ [regionId: string]: { [depId: string]: DepartementDTO } }> {
    const departements = await this.departementModel.find().lean();
    // Map to { [regionId]: { [depId]: departement } }
    const result: { [regionId: string]: { [depId: string]: DepartementDTO } } = {};
    for (const dep of departements) {
      const regionId = dep.b; // 'b' is regionId in your data
      const depId = dep.d; // 'd' is departementId in your data
      if (regionId && depId) {
        if (!result[regionId]) result[regionId] = {};
        result[regionId][depId] = dep as DepartementDTO;
      }
    }
    return result;
  }
}
