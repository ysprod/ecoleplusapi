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
exports.StudentSchema = exports.Student = exports.BloodGroup = exports.Gender = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var Gender;
(function (Gender) {
    Gender["M"] = "M";
    Gender["F"] = "F";
    Gender["O"] = "O";
})(Gender || (exports.Gender = Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_POS"] = "A+";
    BloodGroup["A_NEG"] = "A-";
    BloodGroup["B_POS"] = "B+";
    BloodGroup["B_NEG"] = "B-";
    BloodGroup["AB_POS"] = "AB+";
    BloodGroup["AB_NEG"] = "AB-";
    BloodGroup["O_POS"] = "O+";
    BloodGroup["O_NEG"] = "O-";
})(BloodGroup || (exports.BloodGroup = BloodGroup = {}));
let Student = class Student {
    _id;
    firstName;
    lastName;
    birthDate;
    birthPlace;
    email;
    gender;
    bloodGroup;
    parentContact;
    class;
    classLevel;
    photoUrl;
    healthNotes;
    healthIssues;
    forbiddenFoods;
    parents;
    grades;
    payments;
    matricule;
    nomPere;
    prenomPere;
    telephonePere;
    professionPere;
    nomMere;
    prenomMere;
    telephoneMere;
    professionMere;
    createdAt;
    updatedAt;
};
exports.Student = Student;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Student.prototype, "birthDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "birthPlace", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Gender }),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: BloodGroup }),
    __metadata("design:type", String)
], Student.prototype, "bloodGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "parentContact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "classLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "photoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "healthNotes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "healthIssues", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "forbiddenFoods", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Parent' }], default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "parents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Grade' }], default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "grades", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Payment' }], default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "payments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "matricule", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "nomPere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "prenomPere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "telephonePere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "professionPere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "nomMere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "prenomMere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "telephoneMere", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Student.prototype, "professionMere", void 0);
exports.Student = Student = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Student);
exports.StudentSchema = mongoose_1.SchemaFactory.createForClass(Student);
exports.StudentSchema.index({ firstName: 1, lastName: 1 });
exports.StudentSchema.index({ matricule: 1 }, { unique: true });
exports.StudentSchema.index({ class: 1 });
exports.StudentSchema.index({ parents: 1 });
exports.StudentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.StudentSchema.virtual('age').get(function () {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
//# sourceMappingURL=student.schema.js.map