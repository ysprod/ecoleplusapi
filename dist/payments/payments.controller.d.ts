import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<import("./schemas/payment.schema").Payment>;
    findAll(): Promise<import("./schemas/payment.schema").Payment[]>;
    findOne(id: string): Promise<import("./schemas/payment.schema").Payment | null>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<import("./schemas/payment.schema").Payment | null>;
    remove(id: string): Promise<void>;
}
