import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CogesService } from './coges.service';
import { CreateCogesDto } from './dto/create-coges.dto';

@ApiTags('coges')
@Controller('coges')
export class CogesController {
  constructor(private readonly cogesService: CogesService) {}

  @Get('search')
  @ApiOperation({ summary: 'Rechercher un parent par téléphone' })
  searchParent(@Query('phone') phone: string) {
    return this.cogesService.searchParentByPhone(phone);
  }

  @Get('school')
  @ApiOperation({ summary: "Obtenir le COGES d'une école" })
  findBySchoolId(@Query('schoolId') schoolId: string) {
    return this.cogesService.findBySchoolId(schoolId);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un COGES' })
  create(@Body() createCogesDto: CreateCogesDto) {
    return this.cogesService.create(createCogesDto);
  }

  @Post(':cogesId/add-parent/:parentId')
  @ApiOperation({ summary: 'Ajouter un parent au COGES' })
  addParent(
    @Param('cogesId') cogesId: string,
    @Param('parentId') parentId: string,
  ) {
    return this.cogesService.addParent(cogesId, parentId);
  }

  @Delete('school/:schoolId')
  @ApiOperation({ summary: "Supprimer le COGES d'une école" })
  deleteBySchoolId(@Param('schoolId') schoolId: string) {
    return this.cogesService.deleteBySchoolId(schoolId);
  }
}
