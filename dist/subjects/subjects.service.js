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
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subject_schema_1 = require("./schemas/subject.schema");
let SubjectsService = class SubjectsService {
    subjectModel;
    constructor(subjectModel) {
        this.subjectModel = subjectModel;
    }
    async create(createSubjectDto) {
        try {
            const subject = new this.subjectModel(createSubjectDto);
            return await subject.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Ce code de matière existe déjà pour cette année académique');
            }
            throw error;
        }
    }
    async findAll() {
        return this.subjectModel
            .find({ status: { $ne: 'archived' } })
            .populate('school', 'name')
            .populate('academicYear', 'name')
            .populate('teacher', 'name')
            .sort({ isCore: -1, name: 1 })
            .exec();
    }
    async findBySchool(schoolId) {
        return this.subjectModel
            .find({ school: schoolId, status: { $ne: 'archived' } })
            .populate('academicYear', 'name')
            .populate('teacher', 'name')
            .sort({ name: 1 })
            .exec();
    }
    async findOne(id) {
        const subject = await this.subjectModel
            .findById(id)
            .populate('school', 'name')
            .populate('academicYear', 'name')
            .populate('teacher', 'name')
            .populate('prerequisites', 'name code')
            .populate('coRequisites', 'name code')
            .exec();
        if (!subject) {
            throw new common_1.NotFoundException('Matière non trouvée');
        }
        return subject;
    }
    async update(id, updateSubjectDto) {
        const subject = await this.subjectModel
            .findByIdAndUpdate(id, updateSubjectDto, { new: true })
            .exec();
        if (!subject) {
            throw new common_1.NotFoundException('Matière non trouvée');
        }
        return subject;
    }
    async remove(id) {
        const result = await this.subjectModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Matière non trouvée');
        }
    }
    async archive(id) {
        return this.update(id, { status: 'archived' });
    }
    getSubjects() {
        return ['Mathématiques', 'Physique', 'Chimie', 'Histoire', 'Géographie'];
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map