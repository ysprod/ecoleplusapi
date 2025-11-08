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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const grade_schema_1 = require("./schemas/grade.schema");
const teacher_service_1 = require("../teacher/teacher.service");
const students_service_1 = require("../students/students.service");
let GradeService = class GradeService {
    gradeModel;
    studentService;
    teacherService;
    constructor(gradeModel, studentService, teacherService) {
        this.gradeModel = gradeModel;
        this.studentService = studentService;
        this.teacherService = teacherService;
    }
    async mapToResponseDto(grade) {
        await grade.populate([
            { path: 'student', select: '-password -refreshToken' },
            { path: 'teacher', select: '-password -refreshToken' },
            { path: 'subject' },
            { path: 'class' },
        ]);
        return {
            id: grade._id.toString(),
            student: grade.student,
            teacher: grade.teacher,
            value: grade.value,
            type: grade.type,
            trimester: grade.trimester,
            comments: grade.comments,
            subject: grade.subject,
            class: grade.class,
            createdAt: grade.createdAt,
            updatedAt: grade.updatedAt,
        };
    }
    async create(createGradeDto) {
        await this.studentService.findById(createGradeDto.student);
        await this.teacherService.findById(createGradeDto.teacher);
        const createdGrade = new this.gradeModel({
            ...createGradeDto,
            student: new mongoose_2.Types.ObjectId(createGradeDto.student),
            teacher: new mongoose_2.Types.ObjectId(createGradeDto.teacher),
            subject: createGradeDto.subject ? new mongoose_2.Types.ObjectId(createGradeDto.subject) : undefined,
            class: createGradeDto.class ? new mongoose_2.Types.ObjectId(createGradeDto.class) : undefined,
        });
        const savedGrade = await createdGrade.save();
        return this.mapToResponseDto(savedGrade);
    }
    async findByStudentId(studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Student not found');
        }
        const grades = await this.gradeModel
            .find({ student: studentId })
            .populate([
            { path: 'student', select: '-password -refreshToken' },
            { path: 'teacher', select: '-password -refreshToken' },
            { path: 'subject' },
            { path: 'class' },
        ])
            .exec();
        return Promise.all(grades.map(grade => this.mapToResponseDto(grade)));
    }
    async deleteByStudentId(studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Student not found');
        }
        await this.gradeModel.deleteMany({ student: studentId }).exec();
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(grade_schema_1.Grade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        students_service_1.StudentsService,
        teacher_service_1.TeacherService])
], GradeService);
//# sourceMappingURL=grade.service.js.map