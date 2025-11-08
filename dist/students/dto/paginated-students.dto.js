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
exports.PaginatedStudentsResponseDto = exports.PaginationMetaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const student_response_dto_1 = require("./student-response.dto");
class PaginationMetaDto {
    page;
    limit;
    total;
    pages;
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "pages", void 0);
class PaginatedStudentsResponseDto {
    pagination;
    students;
}
exports.PaginatedStudentsResponseDto = PaginatedStudentsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PaginationMetaDto)
], PaginatedStudentsResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [student_response_dto_1.StudentResponseDto] }),
    __metadata("design:type", Array)
], PaginatedStudentsResponseDto.prototype, "students", void 0);
//# sourceMappingURL=paginated-students.dto.js.map