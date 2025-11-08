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
exports.SubjectSchema = exports.Subject = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Subject = class Subject extends mongoose_2.Document {
    name;
    code;
    school;
    academicYear;
    department;
    teacher;
    description;
    creditHours;
    isCore;
    electiveGroup;
    prerequisites;
    coRequisites;
    status;
};
exports.Subject = Subject;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, uppercase: true, maxlength: 20 }),
    __metadata("design:type", String)
], Subject.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'School', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AcademicYear', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "academicYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Department' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "teacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 500 }),
    __metadata("design:type", String)
], Subject.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], Subject.prototype, "creditHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Subject.prototype, "isCore", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Subject.prototype, "electiveGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Subject' }] }),
    __metadata("design:type", Array)
], Subject.prototype, "prerequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Subject' }] }),
    __metadata("design:type", Array)
], Subject.prototype, "coRequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ['active', 'inactive', 'archived'],
        default: 'active'
    }),
    __metadata("design:type", String)
], Subject.prototype, "status", void 0);
exports.Subject = Subject = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Subject);
exports.SubjectSchema = mongoose_1.SchemaFactory.createForClass(Subject);
exports.SubjectSchema.index({ school: 1, academicYear: 1 });
exports.SubjectSchema.index({ code: 1, academicYear: 1 }, { unique: true });
//# sourceMappingURL=subject.schema.js.map