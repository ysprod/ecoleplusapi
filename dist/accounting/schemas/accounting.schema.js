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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingSchema = exports.Accounting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_schema_1 = require("../../school/schemas/school.schema");
let Accounting = class Accounting {
    date;
    description;
    amount;
    type;
    category;
    paymentMethod;
    reference;
    school;
    user;
};
exports.Accounting = Accounting;
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Accounting.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Accounting.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Accounting.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['income', 'expense'] }),
    __metadata("design:type", String)
], Accounting.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Accounting.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['cash', 'check', 'transfer', 'card'] }),
    __metadata("design:type", String)
], Accounting.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Accounting.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'School', required: true }),
    __metadata("design:type", school_schema_1.School)
], Accounting.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Accounting.prototype, "user", void 0);
exports.Accounting = Accounting = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Accounting);
exports.AccountingSchema = mongoose_1.SchemaFactory.createForClass(Accounting);
//# sourceMappingURL=accounting.schema.js.map