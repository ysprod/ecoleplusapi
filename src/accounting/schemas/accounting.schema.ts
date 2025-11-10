import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { School } from '../../school/schemas/school.schema';

export type AccountingDocument = Accounting & Document;

@Schema({ timestamps: true })
export class Accounting {
  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['cash', 'check', 'transfer', 'card'] })
  paymentMethod: string;

  @Prop({ required: true })
  reference: string;

  @Prop({ type: Types.ObjectId, ref: 'School', required: true })
  school: School;

  @Prop({ type: Types.ObjectId, required: true })
  user: Types.ObjectId;
}

export const AccountingSchema = SchemaFactory.createForClass(Accounting);
