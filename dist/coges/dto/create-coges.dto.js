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
exports.CreateCogesDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCogesDto {
    schoolId;
    parentIds;
    parentId;
    userId;
}
exports.CreateCogesDto = CreateCogesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'école' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCogesDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IDs des parents membres du COGES',
        type: [String],
        required: false,
        default: []
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCogesDto.prototype, "parentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du parent (singulier)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCogesDto.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'utilisateur (sera converti en Parent)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCogesDto.prototype, "userId", void 0);
//# sourceMappingURL=create-coges.dto.js.map