import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Class {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: string;

  @Prop()
  classType: string;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Student' }])
  students: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Schedule' }])
  schedules: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Teacher' }])
  teachers: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  educator: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear' })
  academicYear: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Subject' }])
  subjects: Types.ObjectId[];

  // Nouveau champs: professeur principal
  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  mainTeacher: Types.ObjectId;

  // Capacité maximale de la classe
  @Prop({ default: 0 })
  capacity: number;

  // Salle de classe
  @Prop()
  room: string;

  // Statut actif/inactif
  @Prop({ default: true })
  isActive: boolean;

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Méthode Mongoose déclarée pour le typage TypeScript
  getFullName: () => string;
}

export type ClassDocument = Class & Document;
export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.index({ school: 1, name: 1 }, { unique: true });
ClassSchema.index({ level: 1 });

ClassSchema.virtual('studentCount').get(function () {
  return this.students?.length || 0;
});

ClassSchema.virtual('teacherCount').get(function () {
  return this.teachers?.length || 0;
});

// Virtual pour récupérer les bulletins liés à la classe (ex: pour calculer une moyenne courante)
ClassSchema.virtual('currentTermAverage', {
  ref: 'Bulletin',
  localField: '_id',
  foreignField: 'class',
  justOne: false,
});

ClassSchema.methods.getFullName = function () {
  return `${this.level} - ${this.name}`;
};
