import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounting } from './schemas/accounting.schema';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AccountingService {
  constructor(
    @InjectModel(Accounting.name) private accountingModel: Model<Accounting>,
    private authService: AuthService,
  ) {}

  async create(entryData: CreateAccountingDto): Promise<Accounting> {
    const entry = new this.accountingModel(entryData);
    return entry.save();
  }

  async update(
    entryData: UpdateAccountingDto,
    userId: string,
  ): Promise<Accounting> {
    const updated = await this.accountingModel.findOneAndUpdate(
      { _id: entryData.id, user: userId },
      entryData,
      { new: true },
    );
    if (!updated) {
      throw new Error('Accounting entry not found');
    }
    return updated;
  }

  async getTransactions(query: GetTransactionsQueryDto): Promise<Accounting[]> {
    const dbQuery: any = { school: query.schoolId };
    if (query.type && query.type !== 'all') dbQuery.type = query.type;
    if (query.category && query.category !== 'all')
      dbQuery.category = query.category;
    if (query.startDate || query.endDate) {
      dbQuery.date = {};
      if (query.startDate) dbQuery.date.$gte = new Date(query.startDate);
      if (query.endDate) dbQuery.date.$lte = new Date(query.endDate);
    }
    if (query.search) {
      dbQuery.$or = [
        { description: { $regex: query.search, $options: 'i' } },
        { reference: { $regex: query.search, $options: 'i' } },
      ];
    }

    return this.accountingModel.find(dbQuery).sort({ date: -1 }).exec();
  }

  async findBySchoolId(schoolId: string): Promise<Accounting[]> {
    return this.accountingModel.find({ school: schoolId }).exec();
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.accountingModel.deleteOne({ _id: id, user: userId }).exec();
  }
}
