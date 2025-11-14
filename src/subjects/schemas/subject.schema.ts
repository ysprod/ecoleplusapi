import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubjectDocument = Subject & Document;

export enum SubjectCategory {
  SCIENCES = 'SCIENCES',
  LANGUAGES = 'LANGUAGES',
  HUMANITIES = 'HUMANITIES',
  ARTS = 'ARTS',
  PHYSICAL = 'PHYSICAL',
  TECHNICAL = 'TECHNICAL',
}

@Schema({ 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Subject {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({ 
    required: true, 
    uppercase: true, 
    trim: true,
    maxlength: 10 
  })
  code: string;

  @Prop({ 
    required: true, 
    enum: SubjectCategory,
    type: String 
  })
  category: SubjectCategory;

  @Prop({ 
    required: true, 
    min: 1, 
    max: 10,
    default: 1 
  })
  coefficient: number;

  @Prop({ maxlength: 500 })
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', index: true })
  mainTeacher?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }], default: [] })
  classes?: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'School', required: true, index: true })
  school: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AcademicYear', required: true, index: true })
  academicYear: Types.ObjectId;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ 
    type: String, 
    default: '#3b82f6',
    validate: {
      validator: (v: string) => /^#[0-9A-F]{6}$/i.test(v),
      message: 'La coleur doit avoir le format #RRGGBB'
    }
  })
  color?: string;

  @Prop({ type: Number, default: 0 })
  totalStudents?: number;

  @Prop({ type: Number, default: 0 })
  totalTeachers?: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

// Index composites pour performances
SubjectSchema.index({ school: 1, academicYear: 1, code: 1 }, { unique: true });
SubjectSchema.index({ school: 1, category: 1 });
SubjectSchema.index({ isActive: 1, school: 1 });

// Virtual pour le nombre de classes
SubjectSchema.virtual('classCount').get(function () {
  return this.classes?.length || 0;
});

// Virtual pour le nom complet avec code
SubjectSchema.virtual('fullName').get(function () {
  return `${this.code} - ${this.name}`;
});

// Méthode d'instance pour vérifier si la matière peut être supprimée
SubjectSchema.methods.canBeDeleted = function () {
  return this.totalStudents === 0;
};

// Middleware pre-save pour mettre à jour les statistiques
SubjectSchema.pre('save', async function (next) {
  if (this.isModified('classes')) {
    this.totalStudents = (this.classes?.length || 0) * 30; // Estimation moyenne
  }
  next();
});
