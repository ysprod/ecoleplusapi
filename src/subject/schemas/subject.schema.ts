import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubjectStatus = 'active' | 'inactive' | 'archived';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Subject extends Document {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 20,
    index: true,
  })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true, index: true })
  school: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'AcademicYear',
    required: true,
    index: true,
  })
  academicYear: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department', index: true })
  department?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Teacher', index: true })
  teacher?: Types.ObjectId;

  @Prop({ trim: true, maxlength: 500 })
  description?: string;

  @Prop({ required: true, min: 0, max: 10 })
  creditHours: number;

  @Prop({ default: true, index: true })
  isCore: boolean;

  @Prop({ trim: true, index: true })
  electiveGroup?: string;

  @Prop([{ type: Types.ObjectId, ref: 'Subject' }])
  prerequisites?: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Subject' }])
  coRequisites?: Types.ObjectId[];

  @Prop({
    enum: ['active', 'inactive', 'archived'],
    default: 'active',
    index: true,
  })
  status: SubjectStatus;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.index({ school: 1, academicYear: 1 });
SubjectSchema.index({ school: 1, isCore: 1 });
SubjectSchema.index({ school: 1, electiveGroup: 1 });
SubjectSchema.index({ code: 1, academicYear: 1 }, { unique: true });

// Validation pour les matières optionnelles
SubjectSchema.path('electiveGroup').validate(function (this: Subject) {
  if (!this.isCore && !this.electiveGroup) {
    return false;
  }
  return true;
}, 'Les matières optionnelles doivent avoir un groupe défini');

// Méthodes d'instance
SubjectSchema.methods.activate = function () {
  this.status = 'active';
  return this.save();
};

SubjectSchema.methods.deactivate = function () {
  this.status = 'inactive';
  return this.save();
};

SubjectSchema.methods.addPrerequisite = function (subjectId: Types.ObjectId) {
  if (!this.prerequisites.includes(subjectId)) {
    this.prerequisites.push(subjectId);
  }
  return this.save();
};

// Méthodes statiques
SubjectSchema.statics.findBySchool = function (schoolId: Types.ObjectId) {
  return this.find({ school: schoolId }).sort({ name: 1 });
};

SubjectSchema.statics.findByAcademicYear = function (
  academicYearId: Types.ObjectId,
) {
  return this.find({ academicYear: academicYearId }).sort({
    isCore: -1,
    name: 1,
  });
};

SubjectSchema.statics.findByTeacher = function (teacherId: Types.ObjectId) {
  return this.find({ teacher: teacherId }).sort({ academicYear: -1, name: 1 });
};

SubjectSchema.statics.findCoreSubjects = function (schoolId: Types.ObjectId) {
  return this.find({ school: schoolId, isCore: true }).sort({ name: 1 });
};

SubjectSchema.statics.findElectives = function (
  schoolId: Types.ObjectId,
  group?: string,
) {
  const query: any = { school: schoolId, isCore: false };
  if (group) {
    query.electiveGroup = group;
  }
  return this.find(query).sort({ electiveGroup: 1, name: 1 });
};
