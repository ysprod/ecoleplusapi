import { PaymentType, PaymentStatus } from '../schemas/payment.schema';
export declare class CreatePaymentDto {
    amount: number;
    type: PaymentType;
    status: PaymentStatus;
    student: string;
    parent: string;
    dueDate: Date | string;
    paidAt?: Date | string;
}
