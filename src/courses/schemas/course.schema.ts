import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

export enum WeekParity {
  All = 'all',
  Odd = 'odd',
  Even = 'even',
}

export class WeeklySlot {
  @Prop({ min: 0, max: 6, required: true })
  dayOfWeek: number; // 0=Dimanche, 1=Lundi, ...

  @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
  startTime: string; // HH:mm

  @Prop({ required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ })
  endTime: string; // HH:mm

  @Prop()
  room?: string;

  @Prop({ enum: WeekParity, default: WeekParity.All })
  weekParity?: WeekParity;
}

@Schema({ timestamps: true })
export class Course {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true, index: true })
  school: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true, index: true })
  academicYear: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true })
  class: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true, index: true })
  subject: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true, index: true })
  mainTeacher: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teacher' }], default: [] })
  coTeachers: Types.ObjectId[];

  @Prop({ type: [WeeklySlot], default: [] })
  weeklySlots: WeeklySlot[];

  @Prop({ min: 0, default: 0 })
  hoursPerWeek?: number;

  @Prop({ min: 0, default: 0 })
  coefficient?: number;

  @Prop()
  color?: string;

  @Prop({ min: 1 })
  capacity?: number;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  @Prop({ enum: ['active', 'inactive', 'archived'], default: 'active' })
  status?: 'active' | 'inactive' | 'archived';
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.index(
  { school: 1, academicYear: 1, class: 1, subject: 1 },
  { unique: true },
);

CourseSchema.index({ academicYear: 1, class: 1 });
CourseSchema.index({ subject: 1, mainTeacher: 1 });
