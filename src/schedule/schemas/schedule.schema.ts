import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Schedule {
  _id: Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  hour: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  teacherName: string;

  @Prop()
  title?: string;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  teacher?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class?: Types.ObjectId;

  @Prop({ enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' })
  recurrence?: string;

  @Prop({ default: '#3b82f6' })
  color?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ScheduleDocument = Schedule & Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);