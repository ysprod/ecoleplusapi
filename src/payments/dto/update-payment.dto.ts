import { PaymentStatus } from '../schemas/payment.schema';

export class UpdatePaymentDto {
  status?: PaymentStatus;
  paidAt?: Date;
}
