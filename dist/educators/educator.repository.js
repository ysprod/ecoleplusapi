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
exports.EducatorRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const class_schema_1 = require("../classes/schemas/class.schema");
const mongoose_2 = require("mongoose");
let EducatorRepository = class EducatorRepository {
    classModel;
    constructor(classModel) {
        this.classModel = classModel;
    }
    mapToEducatorClassDto(classDoc) {
        return {
            _id: classDoc._id.toString(),
            name: classDoc.name,
            level: classDoc.level,
            school: classDoc.school?.toString?.(),
            educator: classDoc.educator ? {
                _id: classDoc.educator._id?.toString?.(),
                firstName: classDoc.educator.firstName,
                lastName: classDoc.educator.lastName,
                email: classDoc.educator.email
            } : null,
        };
    }
    async getClassesWithEducators(schoolId, niveau) {
        if (!schoolId || !mongoose_2.Types.ObjectId.isValid(schoolId))
            return [];
        const query = {
            school: new mongoose_2.Types.ObjectId(schoolId),
            educator: { $exists: true, $ne: null }
        };
        if (niveau)
            query.level = niveau;
        const classes = await this.classModel.find(query)
            .populate({ path: 'educator', select: 'firstName lastName email _id' })
            .lean()
            .exec();
        return classes.map(this.mapToEducatorClassDto.bind(this));
    }
    async getClassesByEducator(educatorId) {
        if (!educatorId || !mongoose_2.Types.ObjectId.isValid(educatorId))
            return [];
        const query = { educator: new mongoose_2.Types.ObjectId(educatorId) };
        const classes = await this.classModel.find(query)
            .select('name level school educator')
            .lean()
            .exec();
        return classes.map(this.mapToEducatorClassDto.bind(this));
    }
    async getClassEducator(classId) {
        if (!classId || !mongoose_2.Types.ObjectId.isValid(classId))
            return null;
        const classItem = await this.classModel.findById(classId)
            .populate({ path: 'educator', model: 'User', select: 'firstName lastName email _id' })
            .select('educator')
            .lean()
            .exec();
        return classItem ? this.mapToEducatorClassDto(classItem) : null;
    }
};
exports.EducatorRepository = EducatorRepository;
exports.EducatorRepository = EducatorRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EducatorRepository);
//# sourceMappingURL=educator.repository.js.map