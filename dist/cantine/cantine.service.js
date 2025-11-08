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
exports.CantineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const cantine_repository_1 = require("./cantine.repository");
const school_service_1 = require("../school/school.service");
let CantineService = class CantineService {
    repository;
    schoolService;
    constructor(repository, schoolService) {
        this.repository = repository;
        this.schoolService = schoolService;
    }
    async getMenusBySchoolId(schoolId) {
        if (!mongoose_1.Types.ObjectId.isValid(schoolId))
            throw new common_1.NotFoundException('Invalid schoolId');
        const mesmenus = await this.repository.getMenusBySchool(new mongoose_1.Types.ObjectId(schoolId));
        return mesmenus;
    }
    async createMenu(data) {
        if (!mongoose_1.Types.ObjectId.isValid(data.school)) {
            console.error('Invalid school ID provided:', data.school);
            throw new common_1.NotFoundException('Invalid school');
        }
        try {
            const school = await this.schoolService.findById(data.school.toString());
        }
        catch (error) {
            console.error('School not found:', error.message);
            throw new common_1.NotFoundException('Invalid school - school does not exist');
        }
        return this.repository.createMenu(data);
    }
    async updateMenu(data) {
        if (!mongoose_1.Types.ObjectId.isValid(data.id))
            throw new common_1.NotFoundException('Invalid id');
        const updated = await this.repository.updateMenu(new mongoose_1.Types.ObjectId(data.id), data);
        if (!updated)
            throw new common_1.NotFoundException('Menu non trouvé');
        return updated;
    }
    async deleteMenu(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Invalid id');
        const deleted = await this.repository.deleteMenu(new mongoose_1.Types.ObjectId(id));
        if (!deleted)
            throw new common_1.NotFoundException('Menu non trouvé');
        return deleted;
    }
};
exports.CantineService = CantineService;
exports.CantineService = CantineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cantine_repository_1.CantineRepository,
        school_service_1.SchoolService])
], CantineService);
//# sourceMappingURL=cantine.service.js.map