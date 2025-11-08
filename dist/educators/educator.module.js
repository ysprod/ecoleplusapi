"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducatorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_schema_1 = require("../classes/schemas/class.schema");
const educator_repository_1 = require("./educator.repository");
const educator_service_1 = require("./educator.service");
const educator_controller_1 = require("./educator.controller");
const teacher_service_1 = require("../teacher/teacher.service");
let EducatorModule = class EducatorModule {
};
exports.EducatorModule = EducatorModule;
exports.EducatorModule = EducatorModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: class_schema_1.Class.name, schema: class_schema_1.ClassSchema }])],
        providers: [educator_repository_1.EducatorRepository, educator_service_1.EducatorService, teacher_service_1.TeacherService],
        controllers: [educator_controller_1.EducatorController],
    })
], EducatorModule);
//# sourceMappingURL=educator.module.js.map