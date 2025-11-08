"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const grade_controller_1 = require("./grade.controller");
const grade_service_1 = require("./grade.service");
const grade_schema_1 = require("./schemas/grade.schema");
const teacher_module_1 = require("../teacher/teacher.module");
const class_module_1 = require("../class/class.module");
const subjects_module_1 = require("../subjects/subjects.module");
const students_module_1 = require("../students/students.module");
let GradeModule = class GradeModule {
};
exports.GradeModule = GradeModule;
exports.GradeModule = GradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: grade_schema_1.Grade.name, schema: grade_schema_1.GradeSchema }]),
            students_module_1.StudentsModule,
            teacher_module_1.TeacherModule,
            subjects_module_1.SubjectsModule,
            class_module_1.ClassModule,
        ],
        controllers: [grade_controller_1.GradeController],
        providers: [grade_service_1.GradeService],
        exports: [grade_service_1.GradeService],
    })
], GradeModule);
//# sourceMappingURL=grade.module.js.map