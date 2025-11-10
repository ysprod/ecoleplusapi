import { PaymentType } from '../schemas/payment.schema';
import { Types } from 'mongoose';

export class CreatePaymentDto {
  amount: number;
  type: PaymentType;
  student: Types.ObjectId;
  parent: Types.ObjectId;
  dueDate: Date;
}
