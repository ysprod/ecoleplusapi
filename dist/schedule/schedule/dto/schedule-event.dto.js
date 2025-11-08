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
exports.ScheduleEventDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_dto_1 = require("../../../classes/dto/class.dto");
class ScheduleEventDTO {
    id;
    classId;
    _id;
    title;
    start;
    end;
    color;
    day;
    hour;
    subject;
    teacherName;
    class;
    class_Id;
    allDay;
    editable;
    resizable;
}
exports.ScheduleEventDTO = ScheduleEventDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Date }),
    __metadata("design:type", Date)
], ScheduleEventDTO.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Date }),
    __metadata("design:type", Date)
], ScheduleEventDTO.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "teacherName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => class_dto_1.ClassDto }),
    __metadata("design:type", class_dto_1.ClassDto)
], ScheduleEventDTO.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ScheduleEventDTO.prototype, "class_Id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], ScheduleEventDTO.prototype, "allDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], ScheduleEventDTO.prototype, "editable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], ScheduleEventDTO.prototype, "resizable", void 0);
//# sourceMappingURL=schedule-event.dto.js.map