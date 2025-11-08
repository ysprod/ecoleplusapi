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
exports.ClassResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const school_response_dto_1 = require("../../school/dto/school-response.dto");
const academic_year_response_dto_1 = require("../../academicyears/dto/academic-year-response.dto");
const student_response_dto_1 = require("../../students/dto/student-response.dto");
const subject_response_dto_1 = require("../../subject/dto/subject-response.dto");
const teacher_response_dto_1 = require("../../teacher/dto/teacher-response.dto");
const user_response_dto_1 = require("../../user/dto/user-response.dto");
const ScheduleResponse_dto_1 = require("../../schedule/dto/ScheduleResponse.dto");
class ClassResponseDto {
    id;
    name;
    level;
    classType;
    school;
    students;
    schedules;
    teachers;
    educator;
    academicYear;
    subjects;
    studentCount;
    teacherCount;
    fullName;
    createdAt;
    updatedAt;
}
exports.ClassResponseDto = ClassResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassResponseDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", school_response_dto_1.SchoolResponseDto)
], ClassResponseDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [student_response_dto_1.StudentResponseDto] }),
    __metadata("design:type", Array)
], ClassResponseDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ScheduleResponse_dto_1.ScheduleResponseDto] }),
    __metadata("design:type", Array)
], ClassResponseDto.prototype, "schedules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [teacher_response_dto_1.TeacherResponseDto] }),
    __metadata("design:type", Array)
], ClassResponseDto.prototype, "teachers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], ClassResponseDto.prototype, "educator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", academic_year_response_dto_1.AcademicYearResponseDto)
], ClassResponseDto.prototype, "academicYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [subject_response_dto_1.SubjectResponseDto] }),
    __metadata("design:type", Array)
], ClassResponseDto.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassResponseDto.prototype, "studentCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassResponseDto.prototype, "teacherCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ClassResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ClassResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=class-response.dto.js.map