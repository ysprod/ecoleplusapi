import { PaymentType, PaymentStatus } from '../schemas/payment.schema';

export class PaymentResponseDto {
  id: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  studentId: string;
  parentId: string;
  dueDate: Date | string;
  paidAt?: Date | string;
  createdAt: Date;
  updatedAt: Date;
}
