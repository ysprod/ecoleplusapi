// src/student/schemas/student.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Gender {
  M = 'M',
  F = 'F',
  O = 'O',
}

export enum BloodGroup {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
}

@Schema({ timestamps: true })
export class Student {
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  birthPlace: string;

  @Prop()
  email: string;

  @Prop({ enum: Gender })
  gender: Gender;

  @Prop({ enum: BloodGroup })
  bloodGroup: BloodGroup;

  @Prop()
  parentContact: string;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  class: Types.ObjectId;

  @Prop()
  classLevel: string;

  @Prop()
  photoUrl: string;

  @Prop()
  healthNotes: string;

  @Prop()
  healthIssues: string;

  @Prop()
  forbiddenFoods: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Parent' }], default: [] })
  parents: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Grade' }], default: [] })
  grades: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Payment' }], default: [] })
  payments: Types.ObjectId[];

  // Nouveaux champs
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Bulletin' }], default: [] })
  bulletins: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Conduct' }], default: [] })
  conducts: Types.ObjectId[];

  @Prop()
  matricule: string;

  @Prop()
  nomPere?: string;

  @Prop()
  prenomPere?: string;

  @Prop()
  telephonePere?: string;

  @Prop()
  professionPere?: string;

  @Prop()
  nomMere?: string;

  @Prop()
  prenomMere?: string;

  @Prop()
  telephoneMere?: string;

  @Prop()
  professionMere?: string;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  postalCode?: string;

  @Prop()
  country?: string;

  @Prop()
  nationality?: string;

  @Prop()
  emergencyContact?: string;

  @Prop()
  emergencyContactPhone?: string;

  @Prop()
  emergencyContactRelation?: string;

  @Prop()
  previousSchool?: string;

  @Prop()
  enrollmentDate?: Date;

  @Prop({ default: 'active' })
  status?: string; // active, inactive, graduated, transferred, expelled

  @Prop()
  notes?: string;

  @Prop()
  allergies?: string;

  @Prop()
  medications?: string;

  @Prop()
  specialNeeds?: string;

  @Prop()
  religion?: string;

  @Prop()
  transportMode?: string; // bus, walk, car, bicycle

  @Prop()
  lunchOption?: string; // cantine, home, other

  @Prop()
  insuranceNumber?: string;

  @Prop()
  insuranceProvider?: string;

  @Prop()
  siblingIds?: string[]; // IDs des frères et sœurs dans l'école

  @Prop()
  studentPhoto?: string;

  @Prop()
  birthCertificateUrl?: string;

  @Prop()
  transferCertificateUrl?: string;

  @Prop({ type: [String], default: [] })
  documents?: string[]; // URLs de documents divers

  @Prop({ default: 0 })
  averageGrade: number; // Moyenne générale de l'année

  @Prop()
  classRank: number; // Rang dans la classe

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.index({ firstName: 1, lastName: 1 });
StudentSchema.index({ matricule: 1 }, { unique: true });
StudentSchema.index({ class: 1 });
StudentSchema.index({ parents: 1 });

StudentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

StudentSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});
