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
exports.ActivityRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const activity_entity_1 = require("../entities/activity.entity");
let ActivityRepository = class ActivityRepository {
    activityModel;
    constructor(activityModel) {
        this.activityModel = activityModel;
    }
    async findBySchool(schoolId) {
        return this.activityModel
            .find({ school: schoolId })
            .populate('animator', 'name email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async create(activityData) {
        const activity = new this.activityModel(activityData);
        return activity.save();
    }
    async updateById(updateData) {
        const { id, ...data } = updateData;
        return this.activityModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
    }
    async deleteById(id) {
        await this.activityModel.findByIdAndDelete(id).exec();
    }
};
exports.ActivityRepository = ActivityRepository;
exports.ActivityRepository = ActivityRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(activity_entity_1.Activity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ActivityRepository);
//# sourceMappingURL=activity.repository.js.map