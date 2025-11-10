import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Parent {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }], default: [] })
  students: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Payment' }], default: [] })
  payments: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

export type ParentDocument = Parent & Document;
export const ParentSchema = SchemaFactory.createForClass(Parent);
