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
exports.CantineController = void 0;
const common_1 = require("@nestjs/common");
const cantine_service_1 = require("./cantine.service");
const CantineCreate_dto_1 = require("./dtos/CantineCreate.dto");
const CantineUpdateDto_1 = require("./dtos/CantineUpdateDto");
let CantineController = class CantineController {
    cantineService;
    constructor(cantineService) {
        this.cantineService = cantineService;
    }
    async createCantineMenu(data) {
        const created = await this.cantineService.createMenu(data);
        return { data: created };
    }
    async getCantineMenus(schoolId) {
        const menus = await this.cantineService.getMenusBySchoolId(schoolId);
        return { data: menus };
    }
    async createMenu(data) {
        return this.cantineService.createMenu(data);
    }
    async updateMenu(id, data) {
        return this.cantineService.updateMenu({ ...data, id });
    }
    async deleteMenu(id) {
        return this.cantineService.deleteMenu(id);
    }
};
exports.CantineController = CantineController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CantineController.prototype, "createCantineMenu", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CantineController.prototype, "getCantineMenus", null);
__decorate([
    (0, common_1.Post)('menu'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CantineCreate_dto_1.CantineCreateDto]),
    __metadata("design:returntype", Promise)
], CantineController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Patch)('menu/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CantineUpdateDto_1.CantineUpdateDto]),
    __metadata("design:returntype", Promise)
], CantineController.prototype, "updateMenu", null);
__decorate([
    (0, common_1.Delete)('menu/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CantineController.prototype, "deleteMenu", null);
exports.CantineController = CantineController = __decorate([
    (0, common_1.Controller)('cantine'),
    __metadata("design:paramtypes", [cantine_service_1.CantineService])
], CantineController);
//# sourceMappingURL=cantine.controller.js.map