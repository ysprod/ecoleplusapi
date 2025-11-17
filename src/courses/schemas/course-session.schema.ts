import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseSessionDocument = HydratedDocument<CourseSession>;

export enum SessionStatus {
  Planned = 'planned',
  Completed = 'completed',
  Canceled = 'canceled',
}

@Schema({ timestamps: true })
export class CourseSession {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  course: Types.ObjectId;

  @Prop({ required: true })
  date: Date; // jour calendaire

  @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
  startTime: string;

  @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
  endTime: string;

  @Prop()
  room?: string;

  @Prop({ enum: SessionStatus, default: SessionStatus.Planned })
  status: SessionStatus;

  @Prop()
  topic?: string;

  @Prop()
  notes?: string;

  @Prop()
  materialsUrl?: string;

  @Prop({ min: 0, default: 0 })
  presentCount?: number;

  @Prop({ min: 0, default: 0 })
  lateCount?: number;

  @Prop({ min: 0, default: 0 })
  absentCount?: number;
}

export const CourseSessionSchema = SchemaFactory.createForClass(CourseSession);

CourseSessionSchema.index({ course: 1, date: 1 });
