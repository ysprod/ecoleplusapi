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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const parent_to_student_dto_1 = require("./dto/parent-to-student.dto");
const parent_service_1 = require("./parent.service");
let ParentController = class ParentController {
    parentService;
    constructor(parentService) {
        this.parentService = parentService;
    }
    async create(createParentDto) {
        return this.parentService.create(createParentDto);
    }
    async getMyProfile(req) {
        return this.parentService.findByUserId(req.user.id);
    }
    async getMyChildren(req) {
        const parent = await this.parentService.findByUserId(req.user.id);
        return this.parentService.getChildren(parent.id);
    }
    async findById(id) {
        return this.parentService.findById(id);
    }
    async getChildren(id) {
        return this.parentService.getChildren(id);
    }
    async addChild(id, parentToStudentDto) {
        return this.parentService.addStudentToParent(id, parentToStudentDto.studentId);
    }
    async removeChild(id, studentId) {
        return this.parentService.removeStudentFromParent(id, studentId);
    }
    async addChildToMe(req, parentToStudentDto) {
        const parent = await this.parentService.findByUserId(req.user.id);
        return this.parentService.addStudentToParent(parent.id, parentToStudentDto.studentId);
    }
    async removeChildFromMe(req, studentId) {
        const parent = await this.parentService.findByUserId(req.user.id);
        return this.parentService.removeStudentFromParent(parent.id, studentId);
    }
    async getUserInfo(parentId, fields) {
        const fieldsArray = fields ? fields.split(',') : ['email', 'firstName', 'lastName', 'role'];
        return this.parentService.getUserInfo(parentId, fieldsArray);
    }
};
exports.ParentController = ParentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)('me/children'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "getMyChildren", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/children'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "getChildren", null);
__decorate([
    (0, common_1.Post)(':id/children'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, parent_to_student_dto_1.ParentToStudentDto]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "addChild", null);
__decorate([
    (0, common_1.Delete)(':id/children/:studentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "removeChild", null);
__decorate([
    (0, common_1.Post)('me/children'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, parent_to_student_dto_1.ParentToStudentDto]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "addChildToMe", null);
__decorate([
    (0, common_1.Delete)('me/children/:studentId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "removeChildFromMe", null);
__decorate([
    (0, common_1.Get)(':id/user-info'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('fields')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ParentController.prototype, "getUserInfo", null);
exports.ParentController = ParentController = __decorate([
    (0, common_1.Controller)('parents'),
    __metadata("design:paramtypes", [parent_service_1.ParentService])
], ParentController);
//# sourceMappingURL=parent.controller.js.map