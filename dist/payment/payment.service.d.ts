import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentService {
    private paymentModel;
    constructor(paymentModel: Model<PaymentDocument>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(filter?: any): Promise<Payment[]>;
    findById(id: string): Promise<Payment>;
}
