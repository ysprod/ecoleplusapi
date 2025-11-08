import { Injectable } from '@nestjs/common';
import { RegionDepartementRepository } from './region-departement.repository';

@Injectable()
export class RegionDepartementService {
  constructor(private readonly repo: RegionDepartementRepository) {}

  async fetchAll() {
    return {
      regionsData: await this.repo.getRegions(),
      departementData: await this.repo.getDepartements(),
    };
  }
}
