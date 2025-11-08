import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './schemas/region.schema';
import { Departement, DepartementSchema } from './schemas/departement.schema';
import { RegionDepartementRepository } from './region-departement.repository';
import { RegionDepartementService } from './region-departement.service';
import { RegionDepartementController } from './region-departement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Region.name, schema: RegionSchema },
      { name: Departement.name, schema: DepartementSchema },
    ]),
  ],
  providers: [RegionDepartementRepository, RegionDepartementService],
  controllers: [RegionDepartementController],
})
export class CartoModule {}
