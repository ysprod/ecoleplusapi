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
exports.CarSchema = exports.Car = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Car = class Car extends mongoose_2.Document {
    matricule;
    carmodel;
    year;
    capacity;
    driverName;
    isActive;
};
exports.Car = Car;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'La matricule est obligatoire'],
        unique: true,
        trim: true,
        uppercase: true,
    }),
    __metadata("design:type", String)
], Car.prototype, "matricule", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Le modèle est obligatoire'],
        trim: true
    }),
    __metadata("design:type", String)
], Car.prototype, "carmodel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [true, 'L\'année est obligatoire'],
        min: [1900, 'L\'année doit être supérieure à 1900'],
        max: [new Date().getFullYear() + 1, 'L\'année ne peut pas être dans le futur']
    }),
    __metadata("design:type", Number)
], Car.prototype, "year", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: [true, 'La capacité est obligatoire'],
        min: [1, 'La capacité doit être au moins 1'],
        max: [100, 'La capacité ne peut pas dépasser 100 personnes']
    }),
    __metadata("design:type", Number)
], Car.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'Le nom du chauffeur est obligatoire'],
        trim: true,
        minlength: [2, 'Le nom du chauffeur doit contenir au moins 2 caractères']
    }),
    __metadata("design:type", String)
], Car.prototype, "driverName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Car.prototype, "isActive", void 0);
exports.Car = Car = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Car);
exports.CarSchema = mongoose_1.SchemaFactory.createForClass(Car);
exports.CarSchema.index({ isActive: 1 });
exports.CarSchema.index({ carmodel: 1 });
exports.CarSchema.index({ driverName: 1 });
exports.CarSchema.index({ year: 1 });
exports.CarSchema.virtual('age').get(function () {
    return new Date().getFullYear() - this.year;
});
exports.CarSchema.methods.deactivate = function () {
    this.isActive = false;
    return this.save();
};
exports.CarSchema.methods.activate = function () {
    this.isActive = true;
    return this.save();
};
exports.CarSchema.statics.findActive = function () {
    return this.find({ isActive: true });
};
exports.CarSchema.statics.findByMinCapacity = function (minCapacity) {
    return this.find({ capacity: { $gte: minCapacity }, isActive: true });
};
//# sourceMappingURL=car.schema.js.map