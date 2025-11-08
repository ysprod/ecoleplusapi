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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducatorService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const educator_repository_1 = require("./educator.repository");
const teacher_service_1 = require("../teacher/teacher.service");
let EducatorService = class EducatorService {
    educatorRepo;
    teacherService;
    constructor(educatorRepo, teacherService) {
        this.educatorRepo = educatorRepo;
        this.teacherService = teacherService;
    }
    async getEducatorsByUserIds(userIds) {
        if (!userIds || userIds.length === 0)
            return [];
        return this.teacherService.getEducatorsByUserIds(userIds);
    }
    async getEducatorClassesWithParams(schoolId, niveau) {
        if (!schoolId)
            return { classes: [], educatorsCount: 0 };
        const classes = await this.educatorRepo.getClassesWithEducators(schoolId, niveau);
        const educatorUserIds = this.extractUniqueEducatorUserIds(classes);
        const educators = await this.getEducatorsByUserIds(educatorUserIds);
        const classesWithEducators = this.mapClassesWithEducators(classes, educators);
        return {
            classes: classesWithEducators,
            educatorsCount: educators.length,
        };
    }
    async getEducatorClasses(educatorId) {
        if (!educatorId)
            return { classes: [], educatorsCount: 0 };
        const classes = await this.educatorRepo.getClassesByEducator(educatorId);
        const educatorUserIds = this.extractUniqueEducatorUserIds(classes);
        const educators = await this.getEducatorsByUserIds(educatorUserIds);
        const classesWithEducators = this.mapClassesWithEducators(classes, educators);
        return { classes: classesWithEducators, educatorsCount: educators.length };
    }
    async getEducatorOfClass(classId) {
        if (!classId)
            return null;
        const educator = await this.educatorRepo.getClassEducator(classId);
        return educator ? educator : null;
    }
    async findClassesBySchoolAndNiveau(schoolId, niveau) {
        if (!schoolId || !niveau) {
            throw new common_2.NotFoundException('schoolId and niveau are required');
        }
        const classes = await this.educatorRepo.getClassesWithEducators(schoolId, niveau);
        if (!classes || classes.length === 0) {
            throw new common_2.NotFoundException('No classes found for this school and niveau');
        }
        return classes;
    }
    extractUniqueEducatorUserIds(classes) {
        return Array.from(new Set(classes
            .map(c => c.educator && typeof c.educator === 'object' && c.educator._id ? c.educator._id.toString() : undefined)
            .filter((id) => !!id)));
    }
    mapClassesWithEducators(classes, educators) {
        return classes.map(classItem => {
            const educatorId = classItem.educator && typeof classItem.educator === 'object' && classItem.educator._id
                ? classItem.educator._id.toString()
                : undefined;
            const educatorTeacher = educators.find(teacher => teacher?.user?.id?.toString() === educatorId);
            return { ...classItem, educatorDetails: educatorTeacher || null };
        });
    }
};
exports.EducatorService = EducatorService;
exports.EducatorService = EducatorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [educator_repository_1.EducatorRepository,
        teacher_service_1.TeacherService])
], EducatorService);
//# sourceMappingURL=educator.service.js.map