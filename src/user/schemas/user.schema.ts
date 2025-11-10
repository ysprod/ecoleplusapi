import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { School } from '../../school/schemas/school.schema';
import { Teacher } from '../../teacher/schemas/teacher.schema';
import { Parent } from '../../parent/schemas/parent.schema';
import { Accountant } from '../../accountant/schemas/accountant.schema';

export type UserDocument = User & Document;

export const ROLES = [
  'admin',
  'user',
  'teacher',
  'parent',
  'accountant',
  'staff',
];
export const PROFILE_TYPES = [
  'student',
  'parent',
  'staff',
  'founder',
  'teacher',
  'parent',
  'accountant',
  'other',
];

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ uppercase: true })
  matricule: string;

  @Prop({ uppercase: true })
  firstName: string;

  @Prop({ uppercase: true })
  lastName: string;

  @Prop({ lowercase: true })
  gender: string;

  @Prop({ select: false, minlength: 8 })
  password: string;

  @Prop({ enum: ROLES })
  role: string;

  @Prop({ enum: PROFILE_TYPES, default: 'other', required: true })
  profileType: string;

  @Prop({ default: null })
  emailVerified: Date;

  @Prop()
  phone: string;

  @Prop()
  status: string;

  @Prop()
  birthDate: Date;

  @Prop()
  photo: string;

  @Prop()
  avatar: string;

  @Prop({ type: Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ type: Types.ObjectId, ref: 'Parent' })
  parent: Parent;

  @Prop({ type: Types.ObjectId, ref: 'Accountant' })
  accountant: Accountant;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

UserSchema.index({ matricule: 1 });
