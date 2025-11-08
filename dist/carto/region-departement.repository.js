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
exports.RegionDepartementRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const region_schema_1 = require("./schemas/region.schema");
const departement_schema_1 = require("./schemas/departement.schema");
let RegionDepartementRepository = class RegionDepartementRepository {
    regionModel;
    departementModel;
    constructor(regionModel, departementModel) {
        this.regionModel = regionModel;
        this.departementModel = departementModel;
    }
    async getRegions() {
        const regions = await this.regionModel.find().lean();
        const result = {};
        for (const region of regions) {
            if (region.g) {
                result[region.g] = region;
            }
        }
        return result;
    }
    async getDepartements() {
        const departements = await this.departementModel.find().lean();
        const result = {};
        for (const dep of departements) {
            const regionId = dep.b;
            const depId = dep.d;
            if (regionId && depId) {
                if (!result[regionId])
                    result[regionId] = {};
                result[regionId][depId] = dep;
            }
        }
        return result;
    }
};
exports.RegionDepartementRepository = RegionDepartementRepository;
exports.RegionDepartementRepository = RegionDepartementRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(region_schema_1.Region.name)),
    __param(1, (0, mongoose_1.InjectModel)(departement_schema_1.Departement.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RegionDepartementRepository);
//# sourceMappingURL=region-departement.repository.js.map