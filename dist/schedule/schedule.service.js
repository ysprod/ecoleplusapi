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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_schema_1 = require("./schemas/schedule.schema");
let ScheduleService = class ScheduleService {
    scheduleModel;
    constructor(scheduleModel) {
        this.scheduleModel = scheduleModel;
    }
    async getAllSchedules() {
        return this.scheduleModel.find().populate('class').populate('teacher').exec();
    }
    async createSchedule(data) {
        const created = new this.scheduleModel(data);
        return created.save();
    }
    async getScheduleByClass(classId) {
        return this.scheduleModel.find({ class: classId }).populate('teacher').populate('class').exec();
    }
    async deleteByClassId(classId) {
        await this.scheduleModel.deleteMany({ class: classId });
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schedule_schema_1.Schedule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map