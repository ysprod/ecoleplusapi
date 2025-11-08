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
exports.AcademicYearsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const school_service_1 = require("../school/school.service");
const academicyears_service_1 = require("./academicyears.service");
let AcademicYearsController = class AcademicYearsController {
    academicYearsService;
    schoolService;
    constructor(academicYearsService, schoolService) {
        this.academicYearsService = academicYearsService;
        this.schoolService = schoolService;
    }
    async listAll(userId) {
        const academicYears = await this.academicYearsService.getAcademicYearsWithSchools(userId);
        return { success: true, hasData: academicYears.length > 0, data: academicYears };
    }
    async createSchoolWithAcademicYear(payload) {
        if (!payload.user || !mongoose_1.Types.ObjectId.isValid(payload.user)) {
            throw new common_1.BadRequestException('user is required and must be a valid ObjectId');
        }
        const schoolData = {
            nom: payload.nom,
            localite: payload.localite,
            directeur: payload.directeur,
            phone: payload.phone,
            email: payload.email,
            statut: payload.statut,
            niveaux: payload.niveaux,
            matricule: payload.matricule
        };
        const academicYearData = {
            name: payload.name,
            year: payload.year,
            startDate: payload.startDate,
            endDate: payload.endDate,
            isCurrent: payload.isCurrent,
            user: payload.user
        };
        let school = await this.schoolService.findByEmail(payload.email);
        if (!school) {
            school = await this.schoolService.create(schoolData, payload.user);
        }
        const restructuredPayload = {
            schoolId: school.id,
            academicYear: academicYearData
        };
        const result = await this.academicYearsService.createSchoolWithAcademicYear(restructuredPayload);
        return { success: true, data: result };
    }
    async updateSchoolWithAcademicYear(data) {
        const updated = await this.academicYearsService.updateSchoolWithAcademicYear(data);
        return { success: true, data: updated };
    }
    async patchSchoolWithAcademicYear(data) {
        const updated = await this.academicYearsService.updateSchoolWithAcademicYear(data);
        return { success: true, data: updated };
    }
    async deleteSchoolWithAcademicYear(schoolId, academicYearId) {
        const result = await this.academicYearsService.deleteSchoolWithAcademicYear({ schoolId, academicYearId });
        return { success: true, data: result };
    }
    findOne(id) {
        return this.academicYearsService.findOne(id);
    }
    remove(id) {
        return this.academicYearsService.remove(id);
    }
    async validate(payload) {
        if (!payload.sub) {
            throw new common_1.UnauthorizedException('JWT payload missing sub');
        }
        return { _id: payload.sub, email: payload.email, role: payload.role };
    }
};
exports.AcademicYearsController = AcademicYearsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les années académiques avec leurs écoles' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Liste des années académiques' }),
    __param(0, (0, common_1.Query)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "listAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une année académique et la lier à une école' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Année académique créée' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "createSchoolWithAcademicYear", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: "Mettre à jour une année académique" }),
    (0, swagger_1.ApiOkResponse)({ description: 'Année académique mise à jour' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "updateSchoolWithAcademicYear", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier partiellement une année académique' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Année académique modifiée' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "patchSchoolWithAcademicYear", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Supprimer l'année académique et l'école associée" }),
    (0, swagger_1.ApiOkResponse)({ description: 'Année académique et école supprimées' }),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AcademicYearsController.prototype, "deleteSchoolWithAcademicYear", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une année académique par ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une année académique par ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AcademicYearsController.prototype, "remove", null);
exports.AcademicYearsController = AcademicYearsController = __decorate([
    (0, swagger_1.ApiTags)('academicyears'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('academicyears'),
    __metadata("design:paramtypes", [academicyears_service_1.AcademicYearsService,
        school_service_1.SchoolService])
], AcademicYearsController);
//# sourceMappingURL=academicyears.controller.js.map