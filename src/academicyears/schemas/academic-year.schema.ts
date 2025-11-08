import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AcademicYearDocument = AcademicYear & Document;

@Schema({ timestamps: true })
export class AcademicYear {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'School' }] })
  schools: Types.ObjectId[];

  @Prop({ default: false, index: true })
  isCurrent: boolean;

  @Prop({ enum: ['planned', 'active', 'completed', 'cancelled'], default: 'planned' })
  status: string;

  @Prop({ maxlength: 500 })
  description?: string;

  @Prop({ default: false, index: true })
  isArchived: boolean;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);