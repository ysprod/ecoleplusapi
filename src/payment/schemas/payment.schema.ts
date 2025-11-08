import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum PaymentType {
  TUITION = "TUITION",
  CANTEEN = "CANTEEN",
  TRANSPORT = "TRANSPORT",
  ACTIVITY = "ACTIVITY",
  COGES = "COGES"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  LATE = "LATE",
  PARTIAL = "PARTIAL"
}

@Schema({ timestamps: true })
export class Payment {
  _id: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: PaymentType, required: true })
  type: PaymentType;

  @Prop({ enum: PaymentStatus, required: true })
  status: PaymentStatus;

  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Parent', required: true })
  parent: Types.ObjectId;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  paidAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);