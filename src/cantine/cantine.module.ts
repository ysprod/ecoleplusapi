import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cantine, CantineSchema } from './schemas/cantine.schema';
import { CantineRepository } from './cantine.repository';
import { CantineService } from './cantine.service';
import { CantineController } from './cantine.controller';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cantine.name, schema: CantineSchema }]),
    SchoolModule
  ],
  providers: [CantineRepository, CantineService],
  controllers: [CantineController],
  exports: [CantineService],
})
export class CantineModule {}
