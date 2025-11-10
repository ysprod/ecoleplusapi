import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Educator {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ lowercase: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  gender: string;

  @Prop()
  birthDate: Date;

  @Prop({ type: [String], default: [] })
  subjects: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }], default: [] })
  classes: Types.ObjectId[];

  // Ajout explicite des champs de timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type EducatorDocument = Educator & Document;
export const EducatorSchema = SchemaFactory.createForClass(Educator);
