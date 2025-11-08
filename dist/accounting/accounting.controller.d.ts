import { AccountingService } from './accounting.service';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';
import { User } from '../user/schemas/user.schema';
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    create(createAccountingDto: CreateAccountingDto): Promise<import("./schemas/accounting.schema").Accounting>;
    update(updateAccountingDto: UpdateAccountingDto, user: User): Promise<import("./schemas/accounting.schema").Accounting>;
    getTransactions(query: GetTransactionsQueryDto): Promise<import("./schemas/accounting.schema").Accounting[]>;
    delete(id: string, user: User): Promise<void>;
}
