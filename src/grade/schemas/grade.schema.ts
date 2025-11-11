import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum GradeType {
  INTERROGATION = 'INTERROGATION',
  DEVOIR = 'DEVOIR',
  COMPOSITION = 'COMPOSITION',
}

export enum GradeStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VALIDATED = 'VALIDATED',
}

@Schema({ timestamps: true })
export class Grade {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject', required: true, index: true })
  subject: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true })
  class: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Term', required: true, index: true })
  term: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  @Prop({ enum: GradeType, required: true })
  type: GradeType;

  @Prop({ required: true, min: 0, max: 20 })
  value: number;

  @Prop({ min: 0, max: 20 })
  outOf?: number;

  @Prop({ min: 0, max: 10 })
  weight?: number;

  @Prop({ maxlength: 500 })
  comments?: string;

  @Prop({ maxlength: 200 })
  appreciation?: string;

  @Prop({ enum: GradeStatus, default: GradeStatus.DRAFT })
  status: GradeStatus;

  @Prop()
  evaluationDate?: Date;

  @Prop()
  submittedAt?: Date;

  @Prop()
  validatedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  validatedBy?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export type GradeDocument = Grade & Document;
export const GradeSchema = SchemaFactory.createForClass(Grade);

GradeSchema.index({ student: 1, term: 1, subject: 1 });
GradeSchema.index({ class: 1, term: 1, subject: 1 });
GradeSchema.index({ teacher: 1, term: 1 });
GradeSchema.index({ status: 1 });
