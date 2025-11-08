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
exports.AcademicYearResponseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AcademicYearResponseDto {
    id;
    startDate;
    endDate;
    isCurrent;
    niveaux;
    nom;
    localite;
    directeur;
    phone;
    email;
    statut;
}
exports.AcademicYearResponseDto = AcademicYearResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the academic year to update',
        example: '507f1f77bcf86cd799439011',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of the academic year (YYYY-MM-DD format)',
        example: '2023-09-01',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of the academic year (YYYY-MM-DD format)',
        example: '2024-06-30',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this academic year is the current one',
        example: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AcademicYearResponseDto.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Education levels included in this academic year',
        example: ['Primaire', 'Collège', 'Lycée'],
        required: false,
        type: [String],
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AcademicYearResponseDto.prototype, "niveaux", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the academic year',
        example: 'Année scolaire 2023-2024',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location of the school for this academic year',
        example: 'Paris',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "localite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Director name for this academic year',
        example: 'Jean Dupont',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "directeur", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact phone number for this academic year',
        example: '+33123456789',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Contact email for this academic year',
        example: 'contact@ecole.fr',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the academic year',
        example: 'active',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AcademicYearResponseDto.prototype, "statut", void 0);
//# sourceMappingURL=academic-year-response.dto.js.map