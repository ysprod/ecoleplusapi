import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TermType {
  FIRST = 'FIRST', // 1er Trimestre
  SECOND = 'SECOND', // 2ème Trimestre
  THIRD = 'THIRD', // 3ème Trimestre
}

export enum TermStatus {
  PLANNED = 'PLANNED',
  ACTIVE = 'ACTIVE',
  GRADING = 'GRADING', // Phase de notation
  CLOSED = 'CLOSED', // Clôturé
}

@Schema({ timestamps: true })
export class Term {
  _id: Types.ObjectId;

  @Prop({ enum: TermType, required: true })
  type: TermType;

  @Prop({ required: true })
  name: string; // "1er Trimestre", "2ème Trimestre", etc.

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop({ enum: TermStatus, default: TermStatus.PLANNED })
  status: TermStatus;

  @Prop()
  councilDate?: Date; // Date du conseil de classe

  @Prop({ default: false })
  bulletinsGenerated: boolean;

  @Prop({ default: false })
  bulletinsPublished: boolean;

  @Prop()
  publishedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export type TermDocument = Term & Document;
export const TermSchema = SchemaFactory.createForClass(Term);

TermSchema.index({ academicYear: 1, school: 1, type: 1 }, { unique: true });
TermSchema.index({ status: 1 });
