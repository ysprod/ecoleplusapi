import { PaymentType, PaymentStatus } from '../schemas/payment.schema';

export class CreatePaymentDto {
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  student: string; // studentId
  parent: string;  // parentId
  dueDate: Date | string;
  paidAt?: Date | string;
}