import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Coges, CogesDocument } from './schemas/coges.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Parent, ParentDocument } from '../parent/schemas/parent.schema';
import { CreateCogesDto } from './dto/create-coges.dto';

@Injectable()
export class CogesService {
  constructor(
    @InjectModel(Coges.name) private cogesModel: Model<CogesDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // ✅ injection User
    @InjectModel(Parent.name) private parentModel: Model<ParentDocument>, // ✅ injection Parent
  ) {}

  async findBySchoolId(schoolId: string) {
    if (!Types.ObjectId.isValid(schoolId)) {
      return null;
    }

    const schoolObjectId = new Types.ObjectId(schoolId);

    const result = await this.cogesModel
      .findOne({ school: schoolObjectId })
      .populate({
        path: 'parents',
        populate: { path: 'user', model: 'User' },
      })

      .populate({
        path: 'president',
        populate: { path: 'user', model: 'User' },
      })
      .populate({
        path: 'treasurer',
        populate: { path: 'user', model: 'User' },
      })
      .populate({
        path: 'secretary',
        populate: { path: 'user', model: 'User' },
      })
      .exec();

    return result;
  }

  async create(dto: CreateCogesDto): Promise<Coges> {
    try {
      const { schoolId, parentIds, parentId, userId } = dto;

      if (!schoolId) {
        throw new Error('schoolId is required');
      }
      if (!Types.ObjectId.isValid(schoolId)) {
        throw new Error(`Invalid schoolId format: ${schoolId}`);
      }

      const schoolObjectId = new Types.ObjectId(schoolId);
      const parentObjectIds: Types.ObjectId[] = [];

      // Normaliser parentIds[]
      if (Array.isArray(parentIds) && parentIds.length) {
        for (const id of parentIds) {
          if (Types.ObjectId.isValid(id))
            parentObjectIds.push(new Types.ObjectId(id));
        }
      }

      // parentId simple
      if (parentId && Types.ObjectId.isValid(parentId)) {
        parentObjectIds.push(new Types.ObjectId(parentId));
      }

      // userId -> trouver/créer un Parent lié à cet utilisateur
      if (userId) {
        if (!Types.ObjectId.isValid(userId)) {
          throw new Error(`Invalid userId format: ${userId}`);
        }
        const userObjectId = new Types.ObjectId(userId);
        let parent = await this.parentModel
          .findOne({ user: userObjectId })
          .exec();
        if (!parent) {
          parent = await this.parentModel.create({
            user: userObjectId,
            students: [],
            payments: [],
          });
        }
        parentObjectIds.push(parent._id);
      }

      const update: any = { $setOnInsert: { school: schoolObjectId } };
      if (parentObjectIds.length) {
        update.$addToSet = { parents: { $each: parentObjectIds } };
      }

      // Upsert idempotent: crée si absent, met à jour sinon, évite les doublons même en cas de concurrence
      const result = await this.cogesModel
        .findOneAndUpdate({ school: schoolObjectId }, update, {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        })
        .exec();
      return result as Coges;
    } catch (error: any) {
      // Gestion défensive d'une éventuelle course provoquant E11000: on relit et on met à jour
      if (error?.code === 11000) {
        const schoolObjectId = new Types.ObjectId(dto.schoolId);
        const fallbackParentIds: Types.ObjectId[] = [];
        if (Array.isArray(dto.parentIds)) {
          for (const id of dto.parentIds)
            if (Types.ObjectId.isValid(id))
              fallbackParentIds.push(new Types.ObjectId(id));
        }
        if (dto.parentId && Types.ObjectId.isValid(dto.parentId))
          fallbackParentIds.push(new Types.ObjectId(dto.parentId));
        if (fallbackParentIds.length) {
          const updated = await this.cogesModel
            .findOneAndUpdate(
              { school: schoolObjectId },
              { $addToSet: { parents: { $each: fallbackParentIds } } },
              { new: true },
            )
            .exec();
          return updated as Coges;
        }
        const existing = await this.cogesModel
          .findOne({ school: schoolObjectId })
          .exec();
        if (existing) return existing as Coges;
      }
      console.error('Error creating/upserting COGES:', error);
      throw error;
    }
  }

  async searchParentByPhone(phone: string) {
    const user = await this.userModel.findOne({ phone }).exec();
    if (!user) {
      throw new NotFoundException('Parent non trouvé avec ce téléphone');
    }
    return user;
  }

  async addParent(cogesId: string, parentId: string): Promise<Coges> {
    const updated = await this.cogesModel
      .findByIdAndUpdate(
        cogesId,
        { $addToSet: { parents: new Types.ObjectId(parentId) } },
        { new: true },
      )
      .exec();
    if (!updated) {
      throw new NotFoundException('Coges not found');
    }
    return updated;
  }

  async deleteBySchoolId(schoolId: string) {
    return this.cogesModel.deleteOne({ school: schoolId }).exec();
  }
}
