"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const region_schema_1 = require("./schemas/region.schema");
const departement_schema_1 = require("./schemas/departement.schema");
const region_departement_repository_1 = require("./region-departement.repository");
const region_departement_service_1 = require("./region-departement.service");
const region_departement_controller_1 = require("./region-departement.controller");
let CartoModule = class CartoModule {
};
exports.CartoModule = CartoModule;
exports.CartoModule = CartoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: region_schema_1.Region.name, schema: region_schema_1.RegionSchema },
                { name: departement_schema_1.Departement.name, schema: departement_schema_1.DepartementSchema },
            ]),
        ],
        providers: [region_departement_repository_1.RegionDepartementRepository, region_departement_service_1.RegionDepartementService],
        controllers: [region_departement_controller_1.RegionDepartementController],
    })
], CartoModule);
//# sourceMappingURL=carto.module.js.map