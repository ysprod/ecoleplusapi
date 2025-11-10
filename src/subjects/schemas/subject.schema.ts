import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Subject extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, uppercase: true, maxlength: 20 })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  department?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacher?: Types.ObjectId;

  @Prop({ maxlength: 500 })
  description?: string;

  @Prop({ required: true, min: 0, max: 10 })
  creditHours: number;

  @Prop({ default: true })
  isCore: boolean;

  @Prop()
  electiveGroup?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  prerequisites?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  coRequisites?: Types.ObjectId[];

  @Prop({
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
  })
  status: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.index({ school: 1, academicYear: 1 });
SubjectSchema.index({ code: 1, academicYear: 1 }, { unique: true });
