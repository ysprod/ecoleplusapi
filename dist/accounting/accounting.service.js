"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounting_schema_1 = require("./schemas/accounting.schema");
const auth_service_1 = require("../auth/auth.service");
let AccountingService = class AccountingService {
    accountingModel;
    authService;
    constructor(accountingModel, authService) {
        this.accountingModel = accountingModel;
        this.authService = authService;
    }
    async create(entryData) {
        const entry = new this.accountingModel(entryData);
        return entry.save();
    }
    async update(entryData, userId) {
        const updated = await this.accountingModel.findOneAndUpdate({ _id: entryData.id, user: userId }, entryData, { new: true });
        if (!updated) {
            throw new Error('Accounting entry not found');
        }
        return updated;
    }
    async getTransactions(query) {
        const dbQuery = { school: query.schoolId };
        if (query.type && query.type !== 'all')
            dbQuery.type = query.type;
        if (query.category && query.category !== 'all')
            dbQuery.category = query.category;
        if (query.startDate || query.endDate) {
            dbQuery.date = {};
            if (query.startDate)
                dbQuery.date.$gte = new Date(query.startDate);
            if (query.endDate)
                dbQuery.date.$lte = new Date(query.endDate);
        }
        if (query.search) {
            dbQuery.$or = [
                { description: { $regex: query.search, $options: 'i' } },
                { reference: { $regex: query.search, $options: 'i' } }
            ];
        }
        return this.accountingModel.find(dbQuery).sort({ date: -1 }).exec();
    }
    async findBySchoolId(schoolId) {
        return this.accountingModel.find({ school: schoolId }).exec();
    }
    async delete(id, userId) {
        await this.accountingModel.deleteOne({ _id: id, user: userId }).exec();
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(accounting_schema_1.Accounting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map