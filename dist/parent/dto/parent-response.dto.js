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
exports.ParentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("../../user/dto/user-response.dto");
const student_response_dto_1 = require("../../students/dto/student-response.dto");
const payment_response_dto_1 = require("../../payment/dto/payment-response.dto");
class ParentResponseDto {
    id;
    user;
    students;
    payments;
    createdAt;
    updatedAt;
}
exports.ParentResponseDto = ParentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ParentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], ParentResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [student_response_dto_1.StudentResponseDto] }),
    __metadata("design:type", Array)
], ParentResponseDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [payment_response_dto_1.PaymentResponseDto] }),
    __metadata("design:type", Array)
], ParentResponseDto.prototype, "payments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ParentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ParentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=parent-response.dto.js.map