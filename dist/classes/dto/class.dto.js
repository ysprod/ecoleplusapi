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
exports.ClassDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const school_dto_1 = require("../../school/dto/school.dto");
const teacher_dto_1 = require("../../teacher/dto/teacher.dto");
const user_dto_1 = require("../../user/dto/user.dto");
const schedule_event_dto_1 = require("../../schedule/schedule/dto/schedule-event.dto");
const student_dto_1 = require("../../students/dto/student.dto");
class ClassDto {
    id;
    _id;
    name;
    level;
    classType;
    school;
    students;
    teachers;
    schedules;
    educator;
    createdAt;
    updatedAt;
}
exports.ClassDto = ClassDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ClassDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ClassDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => school_dto_1.SchoolDto }),
    __metadata("design:type", school_dto_1.SchoolDto)
], ClassDto.prototype, "school", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [student_dto_1.StudentDto] }),
    __metadata("design:type", Array)
], ClassDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [teacher_dto_1.TeacherDto] }),
    __metadata("design:type", Array)
], ClassDto.prototype, "teachers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [schedule_event_dto_1.ScheduleEventDTO] }),
    __metadata("design:type", Array)
], ClassDto.prototype, "schedules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], ClassDto.prototype, "educator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ClassDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ClassDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=class.dto.js.map