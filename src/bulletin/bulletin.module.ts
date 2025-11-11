import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bulletin, BulletinSchema } from './schemas/bulletin.schema';
import { BulletinService } from './bulletin.service';
import { BulletinController } from './bulletin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bulletin.name, schema: BulletinSchema },
    ]),
  ],
  controllers: [BulletinController],
  providers: [BulletinService],
  exports: [BulletinService],
})
export class BulletinModule {}
