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
exports.SchoolService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_schema_1 = require("./schemas/school.schema");
let SchoolService = class SchoolService {
    schoolModel;
    constructor(schoolModel) {
        this.schoolModel = schoolModel;
    }
    async create(createSchoolDto, userId, session) {
        const existingSchool = await this.schoolModel.findOne({ email: createSchoolDto.email }).session(session || null);
        if (existingSchool) {
            throw new Error('Une école avec cet email existe déjà');
        }
        const createdSchool = new this.schoolModel({
            ...createSchoolDto,
            user: userId,
            createdBy: userId,
        });
        const savedSchool = await createdSchool.save({ session });
        return this.mapToResponseDto(savedSchool);
    }
    async update(updateSchoolDto, userId) {
        const updatedSchool = await this.schoolModel.findByIdAndUpdate(updateSchoolDto.id, { ...updateSchoolDto, updatedBy: userId }, { new: true, runValidators: true }).exec();
        if (!updatedSchool) {
            throw new common_1.NotFoundException('School not found');
        }
        return this.mapToResponseDto(updatedSchool);
    }
    async findAll() {
        const schools = await this.schoolModel.find().populate('classes').exec();
        return schools.map(school => this.mapToResponseDto(school));
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('School not found');
        }
        const school = await this.schoolModel.findById(id).exec();
        if (!school) {
            throw new common_1.NotFoundException('School not found');
        }
        return this.mapToResponseDto(school);
    }
    async findByEmail(email) {
        const school = await this.schoolModel.findOne({ email }).exec();
        if (!school) {
            return null;
        }
        return this.mapToResponseDto(school);
    }
    async delete(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('School not found');
        }
        await this.schoolModel.findByIdAndDelete(id).exec();
    }
    async addTeacher(schoolId, teacherId, session) {
        const updatedSchool = await this.schoolModel.findByIdAndUpdate(schoolId, { $addToSet: { teachers: teacherId } }, { new: true, session }).exec();
        if (!updatedSchool) {
            throw new common_1.NotFoundException('School not found');
        }
        return this.mapToResponseDto(updatedSchool);
    }
    async addAcademicYear(schoolId, academicYearId, session) {
        const updatedSchool = await this.schoolModel.findByIdAndUpdate(schoolId, { $addToSet: { academicYears: academicYearId } }, { new: true, session }).exec();
        if (!updatedSchool) {
            throw new common_1.NotFoundException('School not found');
        }
        return this.mapToResponseDto(updatedSchool);
    }
    async addClass(schoolId, classId, session) {
        await this.schoolModel.findByIdAndUpdate(schoolId, { $addToSet: { classes: classId } }, { session }).exec();
    }
    async findBySchoolAndLevel(schoolId, niveau) {
        const [school, classes] = await Promise.all([
            this.schoolModel.findById(schoolId).exec(),
            this.schoolModel
                .findById(schoolId)
                .populate({
                path: 'classes',
                match: { level: niveau },
                populate: ['school', 'educator'],
            })
                .then(s => s?.classes || []),
        ]);
        if (!school) {
            throw new Error('School not found');
        }
        return {
            school: this.mapToResponseDto(school),
            classes: classes,
        };
    }
    async addTeacherIfNotExists(schoolId, teacherId) {
        if (!mongoose_2.Types.ObjectId.isValid(schoolId) || !mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.NotFoundException('School or Teacher not found');
        }
        await this.schoolModel.findByIdAndUpdate(schoolId, { $addToSet: { teachers: teacherId } }, { new: true });
    }
    mapToResponseDto(school) {
        return {
            id: school._id.toString(),
            email: school.email,
            nom: school.nom,
            localite: school.localite,
            directeur: school.directeur,
            address: school.address,
            phone: school.phone,
            academicYear: school.academicYear,
            educationLevel: school.educationLevel,
            location: school.location,
            dateCreation: school.dateCreation,
            niveaux: school.niveaux,
            statut: school.statut,
            matricule: school.matricule,
            nbPersonnel: school['nbPersonnel'],
            services: school.services,
            frais: school.frais,
            createdAt: school.createdAt,
            updatedAt: school.updatedAt,
        };
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(school_schema_1.School.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SchoolService);
//# sourceMappingURL=school.service.js.map