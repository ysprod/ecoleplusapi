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
exports.CantineSchema = exports.Cantine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Cantine = class Cantine extends mongoose_2.Document {
    date;
    school;
    menu;
    prix;
    nombreRepas;
    allergenes;
    createdAt;
};
exports.Cantine = Cantine;
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true, index: true }),
    __metadata("design:type", Date)
], Cantine.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'School', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Cantine.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            entree: { type: String, trim: true },
            platPrincipal: { type: String, required: true, trim: true },
            accompagnement: { type: String, trim: true },
            dessert: { type: String, trim: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Cantine.prototype, "menu", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, min: 0 }),
    __metadata("design:type", Number)
], Cantine.prototype, "prix", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0 }),
    __metadata("design:type", Number)
], Cantine.prototype, "nombreRepas", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Cantine.prototype, "allergenes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Cantine.prototype, "createdAt", void 0);
exports.Cantine = Cantine = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Cantine);
exports.CantineSchema = mongoose_1.SchemaFactory.createForClass(Cantine);
exports.CantineSchema.index({ school: 1, date: 1 });
//# sourceMappingURL=cantine.schema.js.map