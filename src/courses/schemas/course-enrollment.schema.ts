import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseEnrollmentDocument = HydratedDocument<CourseEnrollment>;

@Schema({ timestamps: true })
export class CourseEnrollment {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  student: Types.ObjectId;

  @Prop()
  enrolledAt?: Date;

  @Prop()
  leftAt?: Date;

  @Prop({ enum: ['active', 'left', 'transferred'], default: 'active' })
  status?: 'active' | 'left' | 'transferred';
}

export const CourseEnrollmentSchema = SchemaFactory.createForClass(CourseEnrollment);

CourseEnrollmentSchema.index({ course: 1, student: 1 }, { unique: true });
CourseEnrollmentSchema.index({ student: 1, status: 1 });
