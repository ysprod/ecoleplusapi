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
exports.AcademicYearsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const academic_year_schema_1 = require("./schemas/academic-year.schema");
const school_service_1 = require("../school/school.service");
const transaction_service_1 = require("../shared/transaction.service");
const validation_service_1 = require("../shared/validation.service");
let AcademicYearsService = class AcademicYearsService {
    academicYearModel;
    schoolService;
    constructor(academicYearModel, schoolService) {
        this.academicYearModel = academicYearModel;
        this.schoolService = schoolService;
    }
    async create(createDto, session) {
        const created = new this.academicYearModel(createDto);
        return created.save({ session });
    }
    async findAll() {
        return this.academicYearModel.find().populate('schools').exec();
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        return this.academicYearModel.findById(id).populate('schools').exec();
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        await this.academicYearModel.findByIdAndDelete(id).exec();
    }
    async addSchoolToAcademicYear(academicYearId, schoolId, session) {
        validation_service_1.ValidationService.validateObjectId(academicYearId);
        validation_service_1.ValidationService.validateObjectId(schoolId);
        await this.academicYearModel.findByIdAndUpdate(academicYearId, { $addToSet: { schools: new mongoose_2.Types.ObjectId(schoolId) } }, { session });
    }
    async removeSchoolFromAcademicYear(academicYearId, schoolId, session) {
        validation_service_1.ValidationService.validateObjectId(academicYearId);
        validation_service_1.ValidationService.validateObjectId(schoolId);
        await this.academicYearModel.findByIdAndUpdate(academicYearId, { $pull: { schools: new mongoose_2.Types.ObjectId(schoolId) } }, { session });
    }
    async deactivateOtherCurrentYears(userId, currentYearId, session) {
        await this.academicYearModel.updateMany({ user: new mongoose_2.Types.ObjectId(userId), _id: { $ne: new mongoose_2.Types.ObjectId(currentYearId) }, isCurrent: true }, { isCurrent: false }, { session });
    }
    async createWithSchoolTransaction(academicYearDto, schoolId) {
        if (academicYearDto.user && typeof academicYearDto.user === 'string') {
            academicYearDto.user = new mongoose_2.Types.ObjectId(academicYearDto.user);
        }
        const createdYear = await this.create(academicYearDto);
        const createdYearId = createdYear._id.toString();
        await this.addSchoolToAcademicYear(createdYearId, schoolId);
        await this.schoolService.addAcademicYear(schoolId, createdYearId);
        if (academicYearDto.isCurrent) {
            await this.deactivateOtherCurrentYears(academicYearDto.user.toString(), createdYearId);
        }
        return { academicYear: createdYear };
    }
    async getAcademicYearsWithSchools(userid) {
        if (!userid || !mongoose_2.Types.ObjectId.isValid(userid))
            return [];
        const userObjectId = new mongoose_2.Types.ObjectId(userid);
        return this.academicYearModel.find({ user: userObjectId }).populate('schools').exec();
    }
    async updateSchoolWithAcademicYear(data) {
        validation_service_1.ValidationService.validateObjectId(data.id);
        const updated = await this.academicYearModel
            .findByIdAndUpdate(data.id, { $set: { ...data } }, { new: true })
            .populate('schools')
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException('Academic year not found');
        }
        return updated;
    }
    async deleteSchoolWithAcademicYear(params) {
        const { schoolId, academicYearId } = params;
        validation_service_1.ValidationService.validateObjectId(schoolId);
        validation_service_1.ValidationService.validateObjectId(academicYearId);
        return transaction_service_1.TransactionService.runInTransaction(async (session) => {
            await this.removeSchoolFromAcademicYear(academicYearId, schoolId, session);
            const deletedYear = await this.academicYearModel.findByIdAndDelete(academicYearId).session(session).exec();
            if (!deletedYear)
                throw new common_1.NotFoundException('Academic year not found');
            await this.schoolService.delete(schoolId);
            return {
                message: 'Academic year and school deleted successfully',
                academicYearId,
                schoolId,
            };
        });
    }
    async createSchoolWithAcademicYear(payload) {
        const { schoolId, academicYear } = payload;
        validation_service_1.ValidationService.validateObjectId(schoolId);
        return this.createWithSchoolTransaction(academicYear, schoolId);
    }
};
exports.AcademicYearsService = AcademicYearsService;
exports.AcademicYearsService = AcademicYearsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(academic_year_schema_1.AcademicYear.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        school_service_1.SchoolService])
], AcademicYearsService);
//# sourceMappingURL=academicyears.service.js.map