import { ClientSession } from 'mongoose';
export declare class TransactionService {
    static runInTransaction<T>(work: (session: ClientSession) => Promise<T>): Promise<T>;
}
