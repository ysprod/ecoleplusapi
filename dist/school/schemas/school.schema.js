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
exports.SchoolSchema = exports.School = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/schemas/user.schema");
let School = class School {
    _id;
    email;
    nom;
    localite;
    directeur;
    address;
    phone;
    academicYear;
    educationLevel;
    location;
    dateCreation;
    niveaux;
    statut;
    matricule;
    user;
    classes;
    teachers;
    academicYears;
    personnel;
    services;
    frais;
    messagerie;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.School = School;
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, unique: true }),
    __metadata("design:type", String)
], School.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "nom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "localite", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "directeur", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "academicYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "educationLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], School.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], School.prototype, "dateCreation", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], School.prototype, "niveaux", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['public', 'privé'] }),
    __metadata("design:type", String)
], School.prototype, "statut", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], School.prototype, "matricule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], School.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Class' }]),
    __metadata("design:type", Array)
], School.prototype, "classes", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Teacher' }]),
    __metadata("design:type", Array)
], School.prototype, "teachers", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'AcademicYear', default: [] }]),
    __metadata("design:type", Array)
], School.prototype, "academicYears", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            enseignants: { type: [{ type: mongoose_2.Types.ObjectId, ref: 'Teacher' }], default: [] },
            educateurs: { type: [{ type: mongoose_2.Types.ObjectId, ref: 'Educator' }], default: [] },
            coges: { type: [{ type: mongoose_2.Types.ObjectId, ref: 'Coges' }], default: [] },
        },
        default: { enseignants: [], educateurs: [], coges: [] },
    }),
    __metadata("design:type", Object)
], School.prototype, "personnel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            cantine: { type: Boolean, default: false },
            transport: { type: Boolean, default: false },
            activites: { type: Boolean, default: false },
        },
        default: { cantine: false, transport: false, activites: false },
    }),
    __metadata("design:type", Object)
], School.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            transport: { montant: Number, devise: { type: String, default: 'FCFA' } },
            activites: { montant: Number, devise: { type: String, default: 'FCFA' } },
            cotisationCoges: { montant: Number, devise: { type: String, default: 'FCFA' } },
        },
        default: {
            transport: { montant: 0, devise: 'FCFA' },
            activites: { montant: 0, devise: 'FCFA' },
            cotisationCoges: { montant: 0, devise: 'FCFA' },
        },
    }),
    __metadata("design:type", Object)
], School.prototype, "frais", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            active: { type: Boolean, default: false },
            config: { provider: String, apiKey: String },
        },
        default: { active: false },
    }),
    __metadata("design:type", Object)
], School.prototype, "messagerie", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], School.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], School.prototype, "updatedBy", void 0);
exports.School = School = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], School);
exports.SchoolSchema = mongoose_1.SchemaFactory.createForClass(School);
exports.SchoolSchema.index({ statut: 1 });
exports.SchoolSchema.index({ 'services.cantine': 1 });
exports.SchoolSchema.index({ 'services.transport': 1 });
exports.SchoolSchema.virtual('nbPersonnel').get(function () {
    return ((this.personnel?.enseignants?.length || 0) +
        (this.personnel?.educateurs?.length || 0) +
        (this.personnel?.coges?.length || 0));
});
//# sourceMappingURL=school.schema.js.map