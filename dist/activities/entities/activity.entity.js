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
exports.ActivitySchema = exports.Activity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_schema_1 = require("../../school/schemas/school.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
let Activity = class Activity extends mongoose_2.Document {
    school;
    name;
    description;
    category;
    level;
    schedule;
    location;
    maxParticipants;
    currentParticipants;
    animator;
    price;
    isActive;
    createdAt;
};
exports.Activity = Activity;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'School', required: true }),
    __metadata("design:type", school_schema_1.School)
], Activity.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, "Le nom de l'activité est obligatoire"],
        trim: true,
        uppercase: true
    }),
    __metadata("design:type", String)
], Activity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], Activity.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['sport', 'art', 'musique', 'science', 'autre'],
        default: 'autre'
    }),
    __metadata("design:type", String)
], Activity.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['débutant', 'intermédiaire', 'avancé'],
        default: 'débutant'
    }),
    __metadata("design:type", String)
], Activity.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            day: {
                type: String,
                enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                required: true
            },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Activity.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], Activity.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Activity.prototype, "maxParticipants", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Activity.prototype, "currentParticipants", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Activity.prototype, "animator", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Activity.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Activity.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Activity.prototype, "createdAt", void 0);
exports.Activity = Activity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Activity);
exports.ActivitySchema = mongoose_1.SchemaFactory.createForClass(Activity);
//# sourceMappingURL=activity.entity.js.map