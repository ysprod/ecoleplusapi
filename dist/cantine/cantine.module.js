"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CantineModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cantine_schema_1 = require("./schemas/cantine.schema");
const cantine_repository_1 = require("./cantine.repository");
const cantine_service_1 = require("./cantine.service");
const cantine_controller_1 = require("./cantine.controller");
const school_module_1 = require("../school/school.module");
let CantineModule = class CantineModule {
};
exports.CantineModule = CantineModule;
exports.CantineModule = CantineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cantine_schema_1.Cantine.name, schema: cantine_schema_1.CantineSchema }]),
            school_module_1.SchoolModule
        ],
        providers: [cantine_repository_1.CantineRepository, cantine_service_1.CantineService],
        controllers: [cantine_controller_1.CantineController],
        exports: [cantine_service_1.CantineService],
    })
], CantineModule);
//# sourceMappingURL=cantine.module.js.map