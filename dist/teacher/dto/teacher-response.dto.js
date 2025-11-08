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
exports.TeacherResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_response_dto_1 = require("../../class/dto/class-response.dto");
const school_response_dto_1 = require("../../school/dto/school-response.dto");
const grade_response_dto_1 = require("../../grade/dto/grade-response.dto");
const user_response_dto_1 = require("../../user/dto/user-response.dto");
class TeacherResponseDto {
    id;
    user;
    matricule;
    lastName;
    firstName;
    fullName;
    email;
    gender;
    phone;
    birthDate;
    subjects;
    classes;
    schools;
    grades;
    createdAt;
    updatedAt;
}
exports.TeacherResponseDto = TeacherResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], TeacherResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "matricule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TeacherResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TeacherResponseDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], TeacherResponseDto.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [class_response_dto_1.ClassResponseDto] }),
    __metadata("design:type", Array)
], TeacherResponseDto.prototype, "classes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [school_response_dto_1.SchoolResponseDto] }),
    __metadata("design:type", Array)
], TeacherResponseDto.prototype, "schools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [grade_response_dto_1.GradeResponseDto] }),
    __metadata("design:type", Array)
], TeacherResponseDto.prototype, "grades", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TeacherResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TeacherResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=teacher-response.dto.js.map