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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const class_service_1 = require("./class.service");
const create_class_dto_1 = require("./dto/create-class.dto");
const update_class_dto_1 = require("./dto/update-class.dto");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_schema_1 = require("../user/schemas/user.schema");
const mongoose_1 = require("mongoose");
let ClassController = class ClassController {
    classService;
    async getClassStats() {
        const stats = await this.classService.getClassStats();
        return { data: stats };
    }
    async getSchoolStudents(schoolId, niveau, page, limit) {
        const options = { page, limit, niveau };
        return await this.classService.getSchoolStudents(schoolId, options);
    }
    constructor(classService) {
        this.classService = classService;
    }
    async create(createClassDto) {
        return this.classService.create(createClassDto);
    }
    async find(schoolId, niveau) {
        return this.classService.find({ schoolId, niveau });
    }
    async findById(id) {
        return this.classService.findById(id);
    }
    async update(id, updateClassDto, user) {
        return this.classService.update(id, updateClassDto, user._id.toString());
    }
    async remove(id) {
        return this.classService.remove(id);
    }
    async addStudent(classId, studentId) {
        return this.classService.addStudent(classId, studentId);
    }
    async addTeacher(classId, teacherId) {
        return this.classService.addTeacher(classId, teacherId);
    }
    async assignEducator(classId, educatorId) {
        return this.classService.assignEducator(classId, educatorId);
    }
    async getSchoolClassStats(schoolId) {
        return this.classService.getClassStats(schoolId);
    }
    async getGlobalClassStats() {
        return this.classService.getClassStats();
    }
    async getAcademicClasses(schoolId, classType, niveau) {
        if (!schoolId || !mongoose_1.Types.ObjectId.isValid(schoolId)) {
            throw new Error('schoolId is required and must be a valid ObjectId');
        }
        const classes = await this.classService.getAcademicClasses(schoolId, classType, niveau);
        return { data: classes };
    }
    async getClassesBySchoolAndNiveau(schoolId, niveau) {
        return this.classService.find({ schoolId, niveau });
    }
    async getClassDetails(id) {
        const classe = await this.classService.findById(id);
        const school = classe ? await this.classService.getSchoolForClass(id) : null;
        const students = classe ? await this.classService.getStudentsForClass(id) : [];
        return { classe, school, students };
    }
    async getClassTeachers(id) {
        const teachers = await this.classService.getTeachersForClass(id);
        return {
            classId: id,
            teachers,
            count: teachers.length
        };
    }
    async getClassStudents(id) {
        const students = await this.classService.getStudentsForClass(id);
        return {
            classId: id,
            students,
            count: students.length
        };
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassStats", null);
__decorate([
    (0, common_1.Get)('students'),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('niveau')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getSchoolStudents", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_dto_1.CreateClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('niveau')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_class_dto_1.UpdateClassDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':classId/students/:studentId'),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Post)(':classId/teachers/:teacherId'),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Post)(':classId/educator/:educatorId'),
    __param(0, (0, common_1.Param)('classId')),
    __param(1, (0, common_1.Param)('educatorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "assignEducator", null);
__decorate([
    (0, common_1.Get)('stats/school/:schoolId'),
    __param(0, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getSchoolClassStats", null);
__decorate([
    (0, common_1.Get)('stats/global'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getGlobalClassStats", null);
__decorate([
    (0, common_1.Get)('academic'),
    __param(0, (0, common_1.Query)('schoolId')),
    __param(1, (0, common_1.Query)('classType')),
    __param(2, (0, common_1.Query)('niveau')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAcademicClasses", null);
__decorate([
    (0, common_1.Get)('school/:schoolId/niveau/:niveau'),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Param)('niveau')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassesBySchoolAndNiveau", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassDetails", null);
__decorate([
    (0, common_1.Get)(':id/teachers'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassTeachers", null);
__decorate([
    (0, common_1.Get)(':id/students'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassStudents", null);
exports.ClassController = ClassController = __decorate([
    (0, common_1.Controller)('classes'),
    __metadata("design:paramtypes", [class_service_1.ClassService])
], ClassController);
//# sourceMappingURL=class.controller.backup.js.map