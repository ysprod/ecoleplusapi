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
exports.UserSchema = exports.User = exports.PROFILE_TYPES = exports.ROLES = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_schema_1 = require("../../school/schemas/school.schema");
const teacher_schema_1 = require("../../teacher/schemas/teacher.schema");
const parent_schema_1 = require("../../parent/schemas/parent.schema");
const accountant_schema_1 = require("../../accountant/schemas/accountant.schema");
exports.ROLES = ['admin', 'user', 'teacher', 'parent', 'accountant', 'staff'];
exports.PROFILE_TYPES = ['student', 'parent', 'staff', 'founder', 'teacher', 'parent', 'accountant', 'other'];
let User = class User {
    _id;
    email;
    matricule;
    firstName;
    lastName;
    gender;
    password;
    role;
    profileType;
    emailVerified;
    phone;
    status;
    birthDate;
    photo;
    avatar;
    school;
    teacher;
    parent;
    accountant;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "matricule", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ uppercase: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ lowercase: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ select: false, minlength: 8 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: exports.ROLES }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: exports.PROFILE_TYPES, default: 'other', required: true }),
    __metadata("design:type", String)
], User.prototype, "profileType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'School' }),
    __metadata("design:type", school_schema_1.School)
], User.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher' }),
    __metadata("design:type", teacher_schema_1.Teacher)
], User.prototype, "teacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Parent' }),
    __metadata("design:type", parent_schema_1.Parent)
], User.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Accountant' }),
    __metadata("design:type", accountant_schema_1.Accountant)
], User.prototype, "accountant", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual('name').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});
exports.UserSchema.index({ matricule: 1 });
//# sourceMappingURL=user.schema.js.map