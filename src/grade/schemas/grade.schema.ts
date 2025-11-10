import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum GradeType {
  EXAM = 'EXAM',
  TEST = 'TEST',
  HOMEWORK = 'HOMEWORK',
  ORAL = 'ORAL',
  OTHER = 'OTHER',
}

@Schema({ timestamps: true })
export class Grade {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject' })
  subject?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class?: Types.ObjectId;

  @Prop({ required: true })
  value: number;

  @Prop({ enum: GradeType, required: true })
  type: GradeType;

  @Prop({ required: true })
  trimester: number;

  @Prop()
  comments?: string;

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type GradeDocument = Grade & Document;
export const GradeSchema = SchemaFactory.createForClass(Grade);
