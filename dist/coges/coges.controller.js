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
exports.CogesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const coges_service_1 = require("./coges.service");
const create_coges_dto_1 = require("./dto/create-coges.dto");
let CogesController = class CogesController {
    cogesService;
    constructor(cogesService) {
        this.cogesService = cogesService;
    }
    searchParent(phone) {
        return this.cogesService.searchParentByPhone(phone);
    }
    findBySchoolId(schoolId) {
        return this.cogesService.findBySchoolId(schoolId);
    }
    create(createCogesDto) {
        return this.cogesService.create(createCogesDto);
    }
    addParent(cogesId, parentId) {
        return this.cogesService.addParent(cogesId, parentId);
    }
    deleteBySchoolId(schoolId) {
        return this.cogesService.deleteBySchoolId(schoolId);
    }
};
exports.CogesController = CogesController;
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher un parent par téléphone' }),
    __param(0, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CogesController.prototype, "searchParent", null);
__decorate([
    (0, common_1.Get)('school'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir le COGES d\'une école' }),
    __param(0, (0, common_1.Query)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CogesController.prototype, "findBySchoolId", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un COGES' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coges_dto_1.CreateCogesDto]),
    __metadata("design:returntype", void 0)
], CogesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':cogesId/add-parent/:parentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter un parent au COGES' }),
    __param(0, (0, common_1.Param)('cogesId')),
    __param(1, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CogesController.prototype, "addParent", null);
__decorate([
    (0, common_1.Delete)('school/:schoolId'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer le COGES d\'une école' }),
    __param(0, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CogesController.prototype, "deleteBySchoolId", null);
exports.CogesController = CogesController = __decorate([
    (0, swagger_1.ApiTags)('coges'),
    (0, common_1.Controller)('coges'),
    __metadata("design:paramtypes", [coges_service_1.CogesService])
], CogesController);
//# sourceMappingURL=coges.controller.js.map