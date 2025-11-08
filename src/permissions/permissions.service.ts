import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(data: Partial<Permission>): Promise<Permission> {
    return this.permissionModel.create(data);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findById(id: string): Promise<Permission> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Permission not found');
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) throw new NotFoundException('Permission not found');
    return permission;
  }

  async update(id: string, data: Partial<Permission>): Promise<Permission> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Permission not found');
    const updated = await this.permissionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Permission not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Permission not found');
    const deleted = await this.permissionModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Permission not found');
  }
}