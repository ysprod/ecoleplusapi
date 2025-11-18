import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    const existingRole = await this.roleModel.findOne({
      name: createRoleDto.name,
    });

    if (existingRole) {
      throw new BadRequestException('Role with this name already exists');
    }

    const permissionIds = createRoleDto.permissions.map(
      (id) => new Types.ObjectId(id),
    );

    const role = new this.roleModel({
      ...createRoleDto,
      permissions: permissionIds,
    });

    const savedRole = await role.save();
    return this.mapToResponseDto(await savedRole.populate('permissions'));
  }

  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.roleModel.find().populate('permissions').exec();
    return roles.map((role) => this.mapToResponseDto(role));
  }

  async findOne(id: string): Promise<RoleResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid role ID');
    }

    const role = await this.roleModel
      .findById(id)
      .populate('permissions')
      .exec();

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return this.mapToResponseDto(role);
  }

  async update(
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid role ID');
    }

    const role = await this.roleModel.findById(id);

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (role.isSystemRole) {
      throw new BadRequestException('Cannot modify system roles');
    }

    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.roleModel.findOne({
        name: updateRoleDto.name,
      });

      if (existingRole) {
        throw new BadRequestException('Role with this name already exists');
      }
    }

    if (updateRoleDto.permissions) {
      updateRoleDto.permissions = updateRoleDto.permissions.map(
        (id) => new Types.ObjectId(id) as any,
      );
    }

    const updatedRole = await this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .populate('permissions')
      .exec();

    if (!updatedRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return this.mapToResponseDto(updatedRole);
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid role ID');
    }

    const role = await this.roleModel.findById(id);

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (role.isSystemRole) {
      throw new BadRequestException('Cannot delete system roles');
    }

    await this.roleModel.findByIdAndDelete(id);
  }

  private mapToResponseDto(role: RoleDocument): RoleResponseDto {
    return {
      id: (role._id as Types.ObjectId).toString(),
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((p: any) =>
        typeof p === 'string' ? p : p._id?.toString() || p.toString(),
      ),
      isSystemRole: role.isSystemRole,
      createdAt: (role as any).createdAt,
      updatedAt: (role as any).updatedAt,
    };
  }
}
