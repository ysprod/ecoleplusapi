import { PaymentStatus } from '../schemas/payment.schema';
export declare class UpdatePaymentDto {
    status?: PaymentStatus;
    paidAt?: Date;
}
