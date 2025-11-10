import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Accountant {
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'School' })
  school: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export type AccountantDocument = Accountant & Document;
export const AccountantSchema = SchemaFactory.createForClass(Accountant);
