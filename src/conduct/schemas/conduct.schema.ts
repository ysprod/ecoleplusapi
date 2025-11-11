import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ConductLevel {
  EXCELLENT = 'EXCELLENT',
  TRES_BIEN = 'TRES_BIEN',
  BIEN = 'BIEN',
  ASSEZ_BIEN = 'ASSEZ_BIEN',
  PASSABLE = 'PASSABLE',
  INSUFFISANT = 'INSUFFISANT',
}

@Schema({ timestamps: true })
export class Conduct {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true, index: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  class: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Term', required: true, index: true })
  term: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true })
  academicYear: Types.ObjectId;

  // Évaluations
  @Prop({ enum: ConductLevel, default: ConductLevel.BIEN })
  discipline: ConductLevel;

  @Prop({ enum: ConductLevel, default: ConductLevel.BIEN })
  behavior: ConductLevel;

  @Prop({ enum: ConductLevel, default: ConductLevel.BIEN })
  participation: ConductLevel;

  @Prop({ enum: ConductLevel, default: ConductLevel.BIEN })
  workHabits: ConductLevel;

  // Statistiques
  @Prop({ default: 0, min: 0 })
  absences: number; // Nombre d'absences

  @Prop({ default: 0, min: 0 })
  justifiedAbsences: number;

  @Prop({ default: 0, min: 0 })
  lates: number; // Nombre de retards

  @Prop({ default: 0, min: 0 })
  sanctions: number; // Nombre de sanctions

  @Prop({ default: 100, min: 0, max: 100 })
  attendanceRate: number; // Taux de présence en %

  // Remarques
  @Prop({ maxlength: 1000 })
  generalRemarks?: string;

  @Prop([
    {
      date: Date,
      type: String, // "avertissement", "blâme", "exclusion temporaire", etc.
      reason: String,
      teacher: { type: Types.ObjectId, ref: 'Teacher' },
    },
  ])
  sanctionsList?: Array<{
    date: Date;
    type: string;
    reason: string;
    teacher: Types.ObjectId;
  }>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type ConductDocument = Conduct & Document;
export const ConductSchema = SchemaFactory.createForClass(Conduct);

ConductSchema.index({ student: 1, term: 1 }, { unique: true });
ConductSchema.index({ class: 1, term: 1 });
