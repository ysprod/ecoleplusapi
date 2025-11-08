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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
const update_student_dto_1 = require("./dto/update-student.dto");
const user_schema_1 = require("../user/schemas/user.schema");
let StudentsController = class StudentsController {
    studentsService;
    userModel;
    constructor(studentsService, userModel) {
        this.studentsService = studentsService;
        this.userModel = userModel;
    }
    async searchStudents(search) {
        if (!search || !search.trim())
            return { data: [] };
        const results = await this.studentsService.searchStudents(search);
        return { data: results };
    }
    async findAll() {
        return this.studentsService.findAll();
    }
    async create(createStudentDto) {
        return this.studentsService.create(createStudentDto);
    }
    async update(id, updateStudentDto) {
        return this.studentsService.update(id, updateStudentDto);
    }
    async remove(id) {
        return this.studentsService.remove(id);
    }
    async getPaginated(classId, page = 1, limit = 10) {
        return this.studentsService.getPaginatedStudents(classId, page, limit);
    }
    async verifyStudent(id) {
        console.log('Verifying student with user ID:', id);
        common_1.Logger.log(`ID reçu pour vérification : ${id}`, 'StudentsController');
        if (!id || !id.trim()) {
            throw new common_1.NotFoundException('User ID is required');
        }
        const user = await this.userModel.findById(id).select('matricule').lean().exec();
        if (!user || !user.matricule) {
            throw new common_1.NotFoundException('Matricule not found for this user');
        }
        const student = await this.studentsService.findByMatricule(user.matricule);
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return { data: student };
    }
    async findByMatricule(matricule) {
        return this.studentsService.findByMatricule(matricule);
    }
    async findById(id) {
        return this.studentsService.findById(id);
    }
    async addParent(studentId, parentId) {
        return this.studentsService.addParent(studentId, parentId);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "searchStudents", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)('classId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Get)('verifystudent'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "verifyStudent", null);
__decorate([
    (0, common_1.Get)('matricule/:matricule'),
    __param(0, (0, common_1.Param)('matricule')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findByMatricule", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':studentId/parents/:parentId'),
    __param(0, (0, common_1.Param)('studentId')),
    __param(1, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "addParent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        mongoose_2.Model])
], StudentsController);
//# sourceMappingURL=students.controller.js.map