import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionResponseDto } from './dto/permission-response.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    const existingPermission = await this.permissionModel.findOne({
      name: createPermissionDto.name,
    });

    if (existingPermission) {
      throw new BadRequestException(
        'Permission with this name already exists',
      );
    }

    const permission = new this.permissionModel(createPermissionDto);
    const savedPermission = await permission.save();
    return this.mapToResponseDto(savedPermission);
  }

  async findAll(): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionModel.find().exec();
    return permissions.map((permission) => this.mapToResponseDto(permission));
  }

  async findOne(id: string): Promise<PermissionResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid permission ID');
    }

    const permission = await this.permissionModel.findById(id).exec();

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return this.mapToResponseDto(permission);
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid permission ID');
    }

    const permission = await this.permissionModel.findById(id);

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    if (updatePermissionDto.name && updatePermissionDto.name !== permission.name) {
      const existingPermission = await this.permissionModel.findOne({
        name: updatePermissionDto.name,
      });

      if (existingPermission) {
        throw new BadRequestException(
          'Permission with this name already exists',
        );
      }
    }

    const updatedPermission = await this.permissionModel
      .findByIdAndUpdate(id, updatePermissionDto, { new: true })
      .exec();

    if (!updatedPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return this.mapToResponseDto(updatedPermission);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid permission ID');
    }

    const permission = await this.permissionModel.findById(id);

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    await this.permissionModel.findByIdAndDelete(id);
  }

  private mapToResponseDto(
    permission: PermissionDocument,
  ): PermissionResponseDto {
    return {
      id: (permission._id as Types.ObjectId).toString(),
      name: permission.name,
      description: permission.description,
      resource: permission.resource,
      action: permission.action,
      category: permission.category,
      createdAt: (permission as any).createdAt,
      updatedAt: (permission as any).updatedAt,
    };
  }
}
