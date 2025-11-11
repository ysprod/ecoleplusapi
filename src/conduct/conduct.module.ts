import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Conduct, ConductSchema } from './schemas/conduct.schema';
import { ConductService } from './conduct.service';
import { ConductController } from './conduct.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conduct.name, schema: ConductSchema }]),
  ],
  controllers: [ConductController],
  providers: [ConductService],
  exports: [ConductService],
})
export class ConductModule {}
