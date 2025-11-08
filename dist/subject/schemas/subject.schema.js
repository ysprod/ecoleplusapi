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
    (0, mongoose_1.Prop)({ required: true, trim: true, maxlength: 100 }),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, uppercase: true, trim: true, maxlength: 20, index: true }),
    __metadata("design:type", String)
], Subject.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'School', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "school", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AcademicYear', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "academicYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Department', index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher', index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subject.prototype, "teacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, maxlength: 500 }),
    __metadata("design:type", String)
], Subject.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 10 }),
    __metadata("design:type", Number)
], Subject.prototype, "creditHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Subject.prototype, "isCore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, index: true }),
    __metadata("design:type", String)
], Subject.prototype, "electiveGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Subject' }]),
    __metadata("design:type", Array)
], Subject.prototype, "prerequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Subject' }]),
    __metadata("design:type", Array)
], Subject.prototype, "coRequisites", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['active', 'inactive', 'archived'], default: 'active', index: true }),
    __metadata("design:type", String)
], Subject.prototype, "status", void 0);
exports.Subject = Subject = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
], Subject);
exports.SubjectSchema = mongoose_1.SchemaFactory.createForClass(Subject);
exports.SubjectSchema.index({ school: 1, academicYear: 1 });
exports.SubjectSchema.index({ school: 1, isCore: 1 });
exports.SubjectSchema.index({ school: 1, electiveGroup: 1 });
exports.SubjectSchema.index({ code: 1, academicYear: 1 }, { unique: true });
exports.SubjectSchema.path('electiveGroup').validate(function () {
    if (!this.isCore && !this.electiveGroup) {
        return false;
    }
    return true;
}, 'Les matières optionnelles doivent avoir un groupe défini');
exports.SubjectSchema.methods.activate = function () {
    this.status = 'active';
    return this.save();
};
exports.SubjectSchema.methods.deactivate = function () {
    this.status = 'inactive';
    return this.save();
};
exports.SubjectSchema.methods.addPrerequisite = function (subjectId) {
    if (!this.prerequisites.includes(subjectId)) {
        this.prerequisites.push(subjectId);
    }
    return this.save();
};
exports.SubjectSchema.statics.findBySchool = function (schoolId) {
    return this.find({ school: schoolId }).sort({ name: 1 });
};
exports.SubjectSchema.statics.findByAcademicYear = function (academicYearId) {
    return this.find({ academicYear: academicYearId }).sort({ isCore: -1, name: 1 });
};
exports.SubjectSchema.statics.findByTeacher = function (teacherId) {
    return this.find({ teacher: teacherId }).sort({ academicYear: -1, name: 1 });
};
exports.SubjectSchema.statics.findCoreSubjects = function (schoolId) {
    return this.find({ school: schoolId, isCore: true }).sort({ name: 1 });
};
exports.SubjectSchema.statics.findElectives = function (schoolId, group) {
    const query = { school: schoolId, isCore: false };
    if (group) {
        query.electiveGroup = group;
    }
    return this.find(query).sort({ electiveGroup: 1, name: 1 });
};
//# sourceMappingURL=subject.schema.js.map