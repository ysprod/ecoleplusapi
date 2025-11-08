import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidationService } from 'src/shared/validation.service';
import { ActivityController } from './activity.controller';
import { Activity, ActivitySchema } from './entities/activity.entity';
import { ActivityRepository } from './interfaces/activity.repository';
import { ActivityService } from './services/activity.service';
 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository, ValidationService],
  exports: [ActivityService],
})
export class ActivityModule {}