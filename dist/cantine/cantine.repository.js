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
exports.CantineRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cantine_schema_1 = require("./schemas/cantine.schema");
let CantineRepository = class CantineRepository {
    cantineModel;
    constructor(cantineModel) {
        this.cantineModel = cantineModel;
    }
    async getMenusBySchool(schoolId) {
        const schoolIdString = schoolId.toString();
        const query = {
            $or: [
                { school: schoolId },
                { school: schoolIdString }
            ]
        };
        const sortedMenus = await this.cantineModel.find(query).sort({ createdAt: -1, date: 1 });
        return sortedMenus;
    }
    async createMenu(menuData) {
        const menu = new this.cantineModel(menuData);
        return menu.save();
    }
    async updateMenu(id, updateData) {
        return this.cantineModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deleteMenu(id) {
        const result = await this.cantineModel.findByIdAndDelete(id);
        return result !== null;
    }
};
exports.CantineRepository = CantineRepository;
exports.CantineRepository = CantineRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cantine_schema_1.Cantine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CantineRepository);
//# sourceMappingURL=cantine.repository.js.map