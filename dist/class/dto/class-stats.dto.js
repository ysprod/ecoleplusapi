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
exports.ClassStatisticsDto = exports.CreationTrendDto = exports.SchoolStatsDto = exports.ClassTypeStatsDto = exports.LevelStatsDto = exports.ClassStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ClassStatsDto {
    totalClasses;
    avgStudents;
    totalStudents;
    totalTeachers;
}
exports.ClassStatsDto = ClassStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassStatsDto.prototype, "totalClasses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassStatsDto.prototype, "avgStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassStatsDto.prototype, "totalStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassStatsDto.prototype, "totalTeachers", void 0);
class LevelStatsDto {
    level;
    count;
    withEducator;
}
exports.LevelStatsDto = LevelStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LevelStatsDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LevelStatsDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], LevelStatsDto.prototype, "withEducator", void 0);
class ClassTypeStatsDto {
    classType;
    count;
}
exports.ClassTypeStatsDto = ClassTypeStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ClassTypeStatsDto.prototype, "classType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ClassTypeStatsDto.prototype, "count", void 0);
class SchoolStatsDto {
    schoolId;
    count;
}
exports.SchoolStatsDto = SchoolStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchoolStatsDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SchoolStatsDto.prototype, "count", void 0);
class CreationTrendDto {
    month;
    count;
}
exports.CreationTrendDto = CreationTrendDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreationTrendDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreationTrendDto.prototype, "count", void 0);
class ClassStatisticsDto {
    summary;
    byLevel;
    byClassType;
    topSchools;
    creationTrend;
}
exports.ClassStatisticsDto = ClassStatisticsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", ClassStatsDto)
], ClassStatisticsDto.prototype, "summary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LevelStatsDto] }),
    __metadata("design:type", Array)
], ClassStatisticsDto.prototype, "byLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ClassTypeStatsDto] }),
    __metadata("design:type", Array)
], ClassStatisticsDto.prototype, "byClassType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SchoolStatsDto] }),
    __metadata("design:type", Array)
], ClassStatisticsDto.prototype, "topSchools", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreationTrendDto] }),
    __metadata("design:type", Array)
], ClassStatisticsDto.prototype, "creationTrend", void 0);
//# sourceMappingURL=class-stats.dto.js.map