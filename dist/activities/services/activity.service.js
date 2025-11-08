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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const validation_service_1 = require("../../shared/validation.service");
const activity_repository_1 = require("../interfaces/activity.repository");
let ActivityService = class ActivityService {
    repository;
    validationService;
    constructor(repository, validationService) {
        this.repository = repository;
        this.validationService = validationService;
    }
    async getActivitiesBySchool(schoolId) {
        validation_service_1.ValidationService.validateObjectId(schoolId);
        return this.repository.findBySchool(schoolId);
    }
    async createActivity(body) {
        const activitycreated = await this.repository.create(body);
        return activitycreated;
    }
    async updateActivity(updateData) {
        validation_service_1.ValidationService.validateObjectId(updateData.id);
        const result = await this.repository.updateById(updateData);
        if (!result) {
            throw new common_1.NotFoundException('Activity not found');
        }
        return result;
    }
    async deleteActivity(id) {
        validation_service_1.ValidationService.validateObjectId(id);
        await this.repository.deleteById(id);
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository,
        validation_service_1.ValidationService])
], ActivityService);
//# sourceMappingURL=activity.service.js.map