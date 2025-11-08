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
exports.ParentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const parent_schema_1 = require("./schemas/parent.schema");
const common_2 = require("@nestjs/common");
const students_service_1 = require("../students/students.service");
let ParentService = class ParentService {
    parentModel;
    userService;
    studentService;
    constructor(parentModel, userService, studentService) {
        this.parentModel = parentModel;
        this.userService = userService;
        this.studentService = studentService;
    }
    async mapToResponseDto(parent) {
        await parent.populate([
            { path: 'user' },
            { path: 'students' },
            { path: 'payments' },
        ]);
        return {
            id: parent._id.toString(),
            user: parent.user,
            students: parent.students,
            payments: parent.payments,
            createdAt: parent.createdAt,
            updatedAt: parent.updatedAt,
        };
    }
    async create(createParentDto) {
        await this.userService.findById(createParentDto.user);
        const createdParent = new this.parentModel({
            user: new mongoose_2.Types.ObjectId(createParentDto.user),
        });
        const savedParent = await createdParent.save();
        return this.mapToResponseDto(savedParent);
    }
    async findByUserId(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.NotFoundException('User not found');
        }
        const parent = await this.parentModel.findOne({ user: userId }).exec();
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return this.mapToResponseDto(parent);
    }
    async getOrCreateParent(userId) {
        try {
            return await this.findByUserId(userId);
        }
        catch (e) {
            return this.create({ user: userId });
        }
    }
    async getChildren(parentId) {
        if (!mongoose_2.Types.ObjectId.isValid(parentId)) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const parent = await this.parentModel
            .findById(parentId)
            .populate({
            path: 'students',
            populate: {
                path: 'class',
                select: 'name level',
            },
            options: { sort: { lastName: 1, firstName: 1 } },
        })
            .exec();
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return parent.students;
    }
    async addStudentToParent(parentId, studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(parentId) || !mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Parent or student not found');
        }
        await this.studentService.findById(studentId);
        const updatedParent = await this.parentModel
            .findByIdAndUpdate(parentId, { $addToSet: { students: new mongoose_2.Types.ObjectId(studentId) } }, { new: true })
            .exec();
        if (!updatedParent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        await this.studentService.addParent(studentId, parentId);
        return this.mapToResponseDto(updatedParent);
    }
    async removeStudentFromParent(parentId, studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(parentId) || !mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Parent or student not found');
        }
        const updatedParent = await this.parentModel
            .findByIdAndUpdate(parentId, { $pull: { students: new mongoose_2.Types.ObjectId(studentId) } }, { new: true })
            .exec();
        if (!updatedParent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return this.mapToResponseDto(updatedParent);
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const parent = await this.parentModel.findById(id).exec();
        if (!parent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return this.mapToResponseDto(parent);
    }
    async update(id, updateParentDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const updatedParent = await this.parentModel
            .findByIdAndUpdate(id, updateParentDto, { new: true })
            .exec();
        if (!updatedParent) {
            throw new common_1.NotFoundException('Parent not found');
        }
        return this.mapToResponseDto(updatedParent);
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const result = await this.parentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Parent not found');
        }
    }
    async getUserInfo(parentId, fields = ['email', 'firstName', 'lastName', 'role']) {
        if (!mongoose_2.Types.ObjectId.isValid(parentId)) {
            throw new common_1.NotFoundException('Parent not found');
        }
        const parent = await this.parentModel.findById(parentId).exec();
        if (!parent || !parent.user) {
            throw new common_1.NotFoundException('Parent or user not found');
        }
        return this.userService.getUserById(parent.user, fields);
    }
};
exports.ParentService = ParentService;
exports.ParentService = ParentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __param(1, (0, common_1.Inject)((0, common_2.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_2.forwardRef)(() => students_service_1.StudentsService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        students_service_1.StudentsService])
], ParentService);
//# sourceMappingURL=parent.service.js.map