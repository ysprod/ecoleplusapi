import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new this.paymentModel({
      ...createPaymentDto,
      student: new Types.ObjectId(createPaymentDto.student),
      parent: new Types.ObjectId(createPaymentDto.parent),
    });
    return payment.save();
  }

  async findAll(filter: any = {}): Promise<Payment[]> {
    return this.paymentModel
      .find(filter)
      .populate('student')
      .populate('parent')
      .exec();
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentModel
      .findById(id)
      .populate('student')
      .populate('parent')
      .exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
