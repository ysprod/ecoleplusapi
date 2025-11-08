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
exports.GradeSchema = exports.Grade = exports.GradeType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var GradeType;
(function (GradeType) {
    GradeType["EXAM"] = "EXAM";
    GradeType["TEST"] = "TEST";
    GradeType["HOMEWORK"] = "HOMEWORK";
    GradeType["ORAL"] = "ORAL";
    GradeType["OTHER"] = "OTHER";
})(GradeType || (exports.GradeType = GradeType = {}));
let Grade = class Grade {
    _id;
    student;
    teacher;
    subject;
    class;
    value;
    type;
    trimester;
    comments;
    createdAt;
    updatedAt;
};
exports.Grade = Grade;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grade.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Teacher', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grade.prototype, "teacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Subject' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grade.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grade.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Grade.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: GradeType, required: true }),
    __metadata("design:type", String)
], Grade.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Grade.prototype, "trimester", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Grade.prototype, "comments", void 0);
exports.Grade = Grade = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Grade);
exports.GradeSchema = mongoose_1.SchemaFactory.createForClass(Grade);
//# sourceMappingURL=grade.schema.js.map