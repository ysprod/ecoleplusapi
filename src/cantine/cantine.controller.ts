import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CantineService } from './cantine.service';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';

@Controller('cantine')
export class CantineController {
  constructor(private readonly cantineService: CantineService) {}

  /**
   * Crée un menu de cantine (compatible frontend)
   */
  @Post()
  async createCantineMenu(@Body() data: any) {
    const created = await this.cantineService.createMenu(data);
    return { data: created };
  }

  /**
   * Récupère les menus de cantine d'une école (compatible frontend)
   */
  @Get()
  async getCantineMenus(@Query('schoolId') schoolId: string) {
    const menus = await this.cantineService.getMenusBySchoolId(schoolId);
    return { data: menus };
  }
  
  // @Get('menus')
  // async getMenusBySchool(@Query('schoolId') schoolId: string) {
  //   return this.cantineService.getMenusBySchoolId(schoolId);
  // }

  @Post('menu')
  async createMenu(@Body() data: CantineCreateDto) {
    return this.cantineService.createMenu(data);
  }

  @Patch('menu/:id')
  async updateMenu(@Param('id') id: string, @Body() data: CantineUpdateDto) {
    return this.cantineService.updateMenu({ ...data, id });
  }

  @Delete('menu/:id')
  async deleteMenu(@Param('id') id: string) {
    return this.cantineService.deleteMenu(id);
  }
}
