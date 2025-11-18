import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionResponseDto } from './dto/permission-response.dto';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsModalController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('modal')
  @ApiOperation({ summary: 'Créer une nouvelle permission (depuis le modal)' })
  @ApiResponse({ status: HttpStatus.CREATED, type: PermissionResponseDto })
  async createPermissionModal(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Put('modal/:id')
  @ApiOperation({ summary: 'Mettre à jour une permission (depuis le modal)' })
  @ApiParam({ name: 'id', description: 'ID de la permission' })
  @ApiResponse({ status: HttpStatus.OK, type: PermissionResponseDto })
  async updatePermissionModal(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Get('modal')
  @ApiOperation({ summary: 'Lister toutes les permissions (pour le modal)' })
  @ApiResponse({ status: HttpStatus.OK, type: [PermissionResponseDto] })
  async getAllPermissionsModal(): Promise<PermissionResponseDto[]> {
    return this.permissionsService.findAll();
  }

  @Delete('modal/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une permission (depuis le modal)' })
  @ApiParam({ name: 'id', description: 'ID de la permission' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deletePermissionModal(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(id);
  }
}
