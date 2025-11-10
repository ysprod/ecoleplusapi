import { Controller, Get, Post, Body } from '@nestjs/common';
import { Permission } from './schemas/permission.schema';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async findAll(): Promise<Permission[]> {
    return await this.permissionsService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<Permission>): Promise<Permission> {
    return await this.permissionsService.create(data);
  }
}
