import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum RemarkType {
  TEACHER = 'TEACHER', // Professeur principal
  COUNCIL = 'COUNCIL', // Conseil de classe
  PRINCIPAL = 'PRINCIPAL', // Chef d'établissement
  SUBJECT_TEACHER = 'SUBJECT_TEACHER', // Professeur de matière
}

@Schema({ timestamps: true })
export class Remark {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Term', required: true, index: true })
  term: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  @Prop({ enum: RemarkType, required: true })
  type: RemarkType;

  @Prop({ required: true, maxlength: 2000 })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  author?: Types.ObjectId; // Enseignant auteur

  @Prop({ type: Types.ObjectId, ref: 'Subject' })
  subject?: Types.ObjectId; // Si observation par matière

  @Prop()
  authorName?: string; // Nom de l'auteur (si pas dans la base)

  @Prop()
  authorTitle?: string; // "Professeur Principal", "Directeur", etc.

  createdAt?: Date;
  updatedAt?: Date;
}

export type RemarkDocument = Remark & Document;
export const RemarkSchema = SchemaFactory.createForClass(Remark);

RemarkSchema.index({ student: 1, term: 1, type: 1 });
