import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Class } from '../../class/schemas/class.schema';
import { Teacher } from '../../teacher/schemas/teacher.schema';
import { Educator } from '../../educator/schemas/educator.schema';
import { Coges } from '../../coges/schemas/coges.schema';
import { User } from '../../user/schemas/user.schema';
import { AcademicYear } from 'src/academicyears/schemas/academic-year.schema';

@Schema({ timestamps: true })
export class School {
  _id: Types.ObjectId;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ uppercase: true })
  nom: string;

  @Prop({ uppercase: true })
  localite: string;

  @Prop({ uppercase: true })
  directeur: string;

  @Prop({ uppercase: true })
  address: string;

  @Prop({ uppercase: true })
  phone: string;

  @Prop({ uppercase: true })
  academicYear: string;

  @Prop({ uppercase: true })
  educationLevel: string;

  @Prop({ uppercase: true })
  location: string;

  @Prop({ default: Date.now })
  dateCreation: Date;

  @Prop([String])
  niveaux: string[];

  @Prop({ enum: ['public', 'privé'] })
  statut: string;

  @Prop()
  matricule: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Class' }])
  classes: Class[];

  @Prop([{ type: Types.ObjectId, ref: 'Teacher' }])
  teachers: Teacher[];

  @Prop([{ type: Types.ObjectId, ref: 'AcademicYear', default: [] }])
  academicYears: AcademicYear[];

  @Prop({
    type: {
      enseignants: {
        type: [{ type: Types.ObjectId, ref: 'Teacher' }],
        default: [],
      },
      educateurs: {
        type: [{ type: Types.ObjectId, ref: 'Educator' }],
        default: [],
      },
      coges: { type: [{ type: Types.ObjectId, ref: 'Coges' }], default: [] },
    },
    default: { enseignants: [], educateurs: [], coges: [] },
  })
  personnel: {
    enseignants: Teacher[];
    educateurs: Educator[];
    coges: Coges[];
  };

  @Prop({
    type: {
      cantine: { type: Boolean, default: false },
      transport: { type: Boolean, default: false },
      activites: { type: Boolean, default: false },
    },
    default: { cantine: false, transport: false, activites: false },
  })
  services: {
    cantine: boolean;
    transport: boolean;
    activites: boolean;
  };

  @Prop({
    type: {
      transport: { montant: Number, devise: { type: String, default: 'FCFA' } },
      activites: { montant: Number, devise: { type: String, default: 'FCFA' } },
      cotisationCoges: {
        montant: Number,
        devise: { type: String, default: 'FCFA' },
      },
    },
    default: {
      transport: { montant: 0, devise: 'FCFA' },
      activites: { montant: 0, devise: 'FCFA' },
      cotisationCoges: { montant: 0, devise: 'FCFA' },
    },
  })
  frais: {
    transport: { montant: number; devise: string };
    activites: { montant: number; devise: string };
    cotisationCoges: { montant: number; devise: string };
  };

  @Prop({
    type: {
      active: { type: Boolean, default: false },
      config: { provider: String, apiKey: String },
    },
    default: { active: false },
  })
  messagerie: {
    active: boolean;
    config?: { provider?: string; apiKey?: string };
  };

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: User;

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type SchoolDocument = School & Document;

export const SchoolSchema = SchemaFactory.createForClass(School);
// Ensure virtuals (classesCount, teachersCount) appear in JSON
SchoolSchema.set('toJSON', { virtuals: true });
SchoolSchema.set('toObject', { virtuals: true });

SchoolSchema.index({ statut: 1 });
SchoolSchema.index({ 'services.cantine': 1 });
SchoolSchema.index({ 'services.transport': 1 });

// Virtual populate that returns the number of classes linked to this school
// Usage: School.find().populate('classesCount')
// You can also restrict with a match on academicYear when populating from another model
// e.g. populate({ path: 'schools', populate: { path: 'classesCount', match: { academicYear: someId } } })
SchoolSchema.virtual('classesCount', {
  ref: 'Class',
  localField: '_id',
  foreignField: 'school',
  count: true,
});

// Count teachers linked to this school (via Teacher.schools)
SchoolSchema.virtual('teachersCount', {
  ref: 'Teacher',
  localField: '_id',
  foreignField: 'schools',
  count: true,
});

SchoolSchema.virtual('nbPersonnel').get(function () {
  return (
    (this.personnel?.enseignants?.length || 0) +
    (this.personnel?.educateurs?.length || 0) +
    (this.personnel?.coges?.length || 0)
  );
});
