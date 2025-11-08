"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const parent_controller_1 = require("./parent.controller");
const parent_service_1 = require("./parent.service");
const parent_schema_1 = require("./schemas/parent.schema");
const user_module_1 = require("../user/user.module");
const students_module_1 = require("../students/students.module");
let ParentModule = class ParentModule {
};
exports.ParentModule = ParentModule;
exports.ParentModule = ParentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema }]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => students_module_1.StudentsModule),
        ],
        controllers: [parent_controller_1.ParentController],
        providers: [parent_service_1.ParentService],
        exports: [parent_service_1.ParentService],
    })
], ParentModule);
//# sourceMappingURL=parent.module.js.map