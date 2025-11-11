import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Remark, RemarkSchema } from './schemas/remark.schema';
import { RemarkService } from './remark.service';
import { RemarkController } from './remark.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Remark.name, schema: RemarkSchema }]),
  ],
  controllers: [RemarkController],
  providers: [RemarkService],
  exports: [RemarkService],
})
export class RemarkModule {}
