"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicYearsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const academicyears_service_1 = require("./academicyears.service");
const academicyears_controller_1 = require("./academicyears.controller");
const academic_year_schema_1 = require("./schemas/academic-year.schema");
const school_module_1 = require("../school/school.module");
let AcademicYearsModule = class AcademicYearsModule {
};
exports.AcademicYearsModule = AcademicYearsModule;
exports.AcademicYearsModule = AcademicYearsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: academic_year_schema_1.AcademicYear.name, schema: academic_year_schema_1.AcademicYearSchema }]),
            school_module_1.SchoolModule,
        ],
        controllers: [academicyears_controller_1.AcademicYearsController],
        providers: [academicyears_service_1.AcademicYearsService],
        exports: [academicyears_service_1.AcademicYearsService],
    })
], AcademicYearsModule);
//# sourceMappingURL=academicyears.module.js.map