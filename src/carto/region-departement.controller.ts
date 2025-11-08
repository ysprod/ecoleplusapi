import { Controller, Get, All } from '@nestjs/common';
import { RegionDepartementService } from './region-departement.service';

@Controller('carto')
export class RegionDepartementController {
  constructor(private readonly service: RegionDepartementService) {}

  @Get()
  async getAll() {
    const data = await this.service.fetchAll();
    return {
      ...data,
      timestamp: new Date().toISOString(),
    };
  }

  @All()
  methodNotAllowed() {
    return { error: 'Method Not Allowed' };
  }
}
