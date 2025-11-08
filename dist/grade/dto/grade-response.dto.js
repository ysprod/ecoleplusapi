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
exports.GradeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const grade_schema_1 = require("../schemas/grade.schema");
const class_response_dto_1 = require("../../class/dto/class-response.dto");
const student_response_dto_1 = require("../../students/dto/student-response.dto");
const teacher_response_dto_1 = require("../../teacher/dto/teacher-response.dto");
const subject_response_dto_1 = require("../../subject/dto/subject-response.dto");
class GradeResponseDto {
    id;
    student;
    teacher;
    value;
    type;
    trimester;
    comments;
    subject;
    class;
    createdAt;
    updatedAt;
}
exports.GradeResponseDto = GradeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GradeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", student_response_dto_1.StudentResponseDto)
], GradeResponseDto.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", teacher_response_dto_1.TeacherResponseDto)
], GradeResponseDto.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GradeResponseDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: grade_schema_1.GradeType }),
    __metadata("design:type", String)
], GradeResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GradeResponseDto.prototype, "trimester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GradeResponseDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", subject_response_dto_1.SubjectResponseDto)
], GradeResponseDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", class_response_dto_1.ClassResponseDto)
], GradeResponseDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], GradeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], GradeResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=grade-response.dto.js.map