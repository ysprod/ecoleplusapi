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
exports.CogesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coges_schema_1 = require("./schemas/coges.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const parent_schema_1 = require("../parent/schemas/parent.schema");
let CogesService = class CogesService {
    cogesModel;
    userModel;
    parentModel;
    constructor(cogesModel, userModel, parentModel) {
        this.cogesModel = cogesModel;
        this.userModel = userModel;
        this.parentModel = parentModel;
    }
    async findBySchoolId(schoolId) {
        if (!mongoose_2.Types.ObjectId.isValid(schoolId)) {
            return null;
        }
        const schoolObjectId = new mongoose_2.Types.ObjectId(schoolId);
        const result = await this.cogesModel
            .findOne({ school: schoolObjectId })
            .populate({
            path: 'parents',
            populate: { path: 'user', model: 'User' }
        })
            .populate({
            path: 'president',
            populate: { path: 'user', model: 'User' }
        })
            .populate({
            path: 'treasurer',
            populate: { path: 'user', model: 'User' }
        })
            .populate({
            path: 'secretary',
            populate: { path: 'user', model: 'User' }
        })
            .exec();
        return result;
    }
    async create(dto) {
        try {
            const { schoolId, parentIds, parentId, userId } = dto;
            if (!schoolId) {
                throw new Error('schoolId is required');
            }
            if (!mongoose_2.Types.ObjectId.isValid(schoolId)) {
                throw new Error(`Invalid schoolId format: ${schoolId}`);
            }
            const schoolObjectId = new mongoose_2.Types.ObjectId(schoolId);
            const parentObjectIds = [];
            if (Array.isArray(parentIds) && parentIds.length) {
                for (const id of parentIds) {
                    if (mongoose_2.Types.ObjectId.isValid(id))
                        parentObjectIds.push(new mongoose_2.Types.ObjectId(id));
                }
            }
            if (parentId && mongoose_2.Types.ObjectId.isValid(parentId)) {
                parentObjectIds.push(new mongoose_2.Types.ObjectId(parentId));
            }
            if (userId) {
                if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                    throw new Error(`Invalid userId format: ${userId}`);
                }
                const userObjectId = new mongoose_2.Types.ObjectId(userId);
                let parent = await this.parentModel.findOne({ user: userObjectId }).exec();
                if (!parent) {
                    parent = await this.parentModel.create({ user: userObjectId, students: [], payments: [] });
                }
                parentObjectIds.push(parent._id);
            }
            const update = { $setOnInsert: { school: schoolObjectId } };
            if (parentObjectIds.length) {
                update.$addToSet = { parents: { $each: parentObjectIds } };
            }
            const result = await this.cogesModel
                .findOneAndUpdate({ school: schoolObjectId }, update, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            })
                .exec();
            return result;
        }
        catch (error) {
            if (error?.code === 11000) {
                const schoolObjectId = new mongoose_2.Types.ObjectId(dto.schoolId);
                const fallbackParentIds = [];
                if (Array.isArray(dto.parentIds)) {
                    for (const id of dto.parentIds)
                        if (mongoose_2.Types.ObjectId.isValid(id))
                            fallbackParentIds.push(new mongoose_2.Types.ObjectId(id));
                }
                if (dto.parentId && mongoose_2.Types.ObjectId.isValid(dto.parentId))
                    fallbackParentIds.push(new mongoose_2.Types.ObjectId(dto.parentId));
                if (fallbackParentIds.length) {
                    const updated = await this.cogesModel
                        .findOneAndUpdate({ school: schoolObjectId }, { $addToSet: { parents: { $each: fallbackParentIds } } }, { new: true })
                        .exec();
                    return updated;
                }
                const existing = await this.cogesModel.findOne({ school: schoolObjectId }).exec();
                if (existing)
                    return existing;
            }
            console.error('Error creating/upserting COGES:', error);
            throw error;
        }
    }
    async searchParentByPhone(phone) {
        const user = await this.userModel.findOne({ phone }).exec();
        if (!user) {
            throw new common_1.NotFoundException('Parent non trouvé avec ce téléphone');
        }
        return user;
    }
    async addParent(cogesId, parentId) {
        const updated = await this.cogesModel
            .findByIdAndUpdate(cogesId, { $addToSet: { parents: new mongoose_2.Types.ObjectId(parentId) } }, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException('Coges not found');
        }
        return updated;
    }
    async deleteBySchoolId(schoolId) {
        return this.cogesModel.deleteOne({ school: schoolId }).exec();
    }
};
exports.CogesService = CogesService;
exports.CogesService = CogesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coges_schema_1.Coges.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(parent_schema_1.Parent.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CogesService);
//# sourceMappingURL=coges.service.js.map