"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class TransactionService {
    static async runInTransaction(work) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const result = await work(session);
            await session.commitTransaction();
            return result;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map