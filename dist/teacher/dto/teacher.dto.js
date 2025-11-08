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
exports.TeacherDto = void 0;
const school_dto_1 = require("../../school/dto/school.dto");
const class_dto_1 = require("../../classes/dto/class.dto");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../../user/dto/user.dto");
const grade_dto_1 = require("../../grade/dto/grade.dto");
class TeacherDto {
    _id;
    user;
    matricule;
    lastName;
    firstName;
    fullName;
    name;
    email;
    phone;
    gender;
    birthDate;
    subjects;
    schools;
    classes;
    grades;
    createdAt;
    updatedAt;
}
exports.TeacherDto = TeacherDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], TeacherDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "matricule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    __metadata("design:type", Array)
], TeacherDto.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [school_dto_1.SchoolDto] }),
    __metadata("design:type", Array)
], TeacherDto.prototype, "schools", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [class_dto_1.ClassDto] }),
    __metadata("design:type", Array)
], TeacherDto.prototype, "classes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [grade_dto_1.GradeDto] }),
    __metadata("design:type", Array)
], TeacherDto.prototype, "grades", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TeacherDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=teacher.dto.js.map