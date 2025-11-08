import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schemas/schedule.schema';
import { ScheduleEventDto } from './dto/schedule-event.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async getAllSchedules(): Promise<Schedule[]> {
    return this.scheduleModel.find().populate('class').populate('teacher').exec();
  }

  async createSchedule(data: ScheduleEventDto): Promise<Schedule> {
    const created = new this.scheduleModel(data);
    return created.save();
  }

  async getScheduleByClass(classId: string): Promise<Schedule[]> {
    return this.scheduleModel.find({ class: classId }).populate('teacher').populate('class').exec();
  }

  async deleteByClassId(classId: string): Promise<void> {
    await this.scheduleModel.deleteMany({ class: classId });
  }
}