import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsService {
    private paymentModel;
    constructor(paymentModel: Model<PaymentDocument>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment | null>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null>;
    remove(id: string): Promise<void>;
}
