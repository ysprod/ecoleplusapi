import { Model } from 'mongoose';
import { Accounting } from './schemas/accounting.schema';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class AccountingService {
    private accountingModel;
    private authService;
    constructor(accountingModel: Model<Accounting>, authService: AuthService);
    create(entryData: CreateAccountingDto): Promise<Accounting>;
    update(entryData: UpdateAccountingDto, userId: string): Promise<Accounting>;
    getTransactions(query: GetTransactionsQueryDto): Promise<Accounting[]>;
    findBySchoolId(schoolId: string): Promise<Accounting[]>;
    delete(id: string, userId: string): Promise<void>;
}
