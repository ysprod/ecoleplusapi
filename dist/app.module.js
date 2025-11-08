"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const subjects_module_1 = require("./subjects/subjects.module");
const academicyears_module_1 = require("./academicyears/academicyears.module");
const school_module_1 = require("./school/school.module");
const user_module_1 = require("./user/user.module");
const class_module_1 = require("./class/class.module");
const teacher_module_1 = require("./teacher/teacher.module");
const grade_module_1 = require("./grade/grade.module");
const students_module_1 = require("./students/students.module");
const parent_module_1 = require("./parent/parent.module");
const auth_module_1 = require("./auth/auth.module");
const payment_module_1 = require("./payment/payment.module");
const schedule_module_1 = require("./schedule/schedule.module");
const coges_module_1 = require("./coges/coges.module");
const accounting_module_1 = require("./accounting/accounting.module");
const car_module_1 = require("./cars/car.module");
const activity_module_1 = require("./activities/activity.module");
const support_module_1 = require("./support/support.module");
const carto_module_1 = require("./carto/carto.module");
const permissions_module_1 = require("./permissions/permissions.module");
const cantine_module_1 = require("./cantine/cantine.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: config.get('MONGODB_URI') || 'mongodb://localhost:27017',
                    dbName: config.get('MONGODB_DB') || undefined,
                    bufferCommands: false,
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 45000,
                }),
                inject: [config_1.ConfigService],
            }),
            subjects_module_1.SubjectsModule,
            school_module_1.SchoolModule,
            user_module_1.UserModule,
            students_module_1.StudentsModule,
            car_module_1.CarModule,
            grade_module_1.GradeModule,
            parent_module_1.ParentModule,
            class_module_1.ClassModule, teacher_module_1.TeacherModule,
            academicyears_module_1.AcademicYearsModule,
            auth_module_1.AuthModule,
            payment_module_1.PaymentModule,
            schedule_module_1.ScheduleModule,
            coges_module_1.CogesModule,
            accounting_module_1.AccountingModule,
            activity_module_1.ActivityModule,
            support_module_1.SupportModule,
            carto_module_1.CartoModule,
            permissions_module_1.PermissionsModule,
            cantine_module_1.CantineModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map