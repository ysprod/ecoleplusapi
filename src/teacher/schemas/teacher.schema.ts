import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher {
  _id: Types.ObjectId;

  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  matricule: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  phone: string;

  @Prop()
  birthDate: Date;

  @Prop({ type: [String], default: [] })
  subjects: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }], default: [] })
  classes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'School' }], default: [] })
  schools: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Grade' }], default: [] })
  grades: Types.ObjectId[];

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type TeacherDocument = Teacher & Document;
export const TeacherSchema = SchemaFactory.createForClass(Teacher);

TeacherSchema.index({ lastName: 1, firstName: 1 });

TeacherSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});
