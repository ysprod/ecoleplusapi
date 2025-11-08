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
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const school_service_1 = require("./school.service");
const create_school_dto_1 = require("./dto/create-school.dto");
const update_school_dto_1 = require("./dto/update-school.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_schema_1 = require("../user/schemas/user.schema");
let SchoolController = class SchoolController {
    schoolService;
    constructor(schoolService) {
        this.schoolService = schoolService;
    }
    getEducatorsRedirect(schoolId, niveau) {
        const params = new URLSearchParams();
        if (schoolId)
            params.set('schoolId', schoolId);
        if (niveau)
            params.set('niveau', niveau);
        return { url: `/educators/classes${params.toString() ? `?${params.toString()}` : ''}` };
    }
    async create(createSchoolDto, user) {
        return this.schoolService.create(createSchoolDto, user._id.toString());
    }
    async update(updateSchoolDto, user) {
        return this.schoolService.update(updateSchoolDto, user._id.toString());
    }
    async findAll() {
        return this.schoolService.findAll();
    }
    async findById(id) {
        const school = await this.schoolService.findById(id);
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return school;
    }
    async delete(id) {
        return this.schoolService.delete(id);
    }
    async addTeacher(schoolId, teacherId) {
        return this.schoolService.addTeacher(schoolId, teacherId);
    }
    async addAcademicYear(schoolId, academicYearId) {
        return this.schoolService.addAcademicYear(schoolId, academicYearId);
    }
    async findBySchoolAndLevel(schoolId, niveau) {
        return this.schoolService.findBySchoolAndLevel(schoolId, niveau);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Get)('educators'),
    (0, common_1.Redirect)(undefined, 302),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('niveau')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "getEducatorsRedirect", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_dto_1.CreateSchoolDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_school_dto_1.UpdateSchoolDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':schoolId/teachers/:teacherId'),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Post)(':schoolId/academic-years/:academicYearId'),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Param)('academicYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "addAcademicYear", null);
__decorate([
    (0, common_1.Get)(':schoolId/levels/:niveau'),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Param)('niveau')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findBySchoolAndLevel", null);
exports.SchoolController = SchoolController = __decorate([
    (0, common_1.Controller)('schools'),
    __metadata("design:paramtypes", [school_service_1.SchoolService])
], SchoolController);
//# sourceMappingURL=school.controller.js.map