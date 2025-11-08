import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { ActivityCreateDto } from '../dtos/activity-create.dto';
import { ActivityUpdateDto } from '../dtos/activity-update.dto';
import { Activity } from '../entities/activity.entity';
import { IActivityRepository } from './IActivityRepository';
 
@Injectable()
export class ActivityRepository implements IActivityRepository {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
  ) {}

  async findBySchool(schoolId: string): Promise<Activity[]> {
    return this.activityModel
      .find({ school: schoolId })
      .populate('animator', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(activityData: ActivityCreateDto): Promise<Activity> {
    const activity = new this.activityModel(activityData);
    return activity.save();
  }

  async updateById(updateData: ActivityUpdateDto): Promise<Activity | null> {
    const { id, ...data } = updateData;
    return this.activityModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.activityModel.findByIdAndDelete(id).exec();
  }
}