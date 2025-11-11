import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BulletinService } from './bulletin.service';
import { CreateBulletinDto } from './dto/create-bulletin.dto';
import { UpdateBulletinDto } from './dto/update-bulletin.dto';
import { BulletinResponseDto } from './dto/bulletin-response.dto';
import {
  ArchiveBulletinDto,
  GenerateBulletinDto,
  PublishBulletinDto,
} from './dto/actions.dto';

@ApiTags('bulletins')
@Controller('bulletins')
export class BulletinController {
  constructor(private readonly bulletinService: BulletinService) {}

  @Post()
  create(@Body() dto: CreateBulletinDto): Promise<BulletinResponseDto> {
    return this.bulletinService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BulletinResponseDto> {
    return this.bulletinService.findById(id);
  }

  @Get('by-student/:studentId/:termId')
  byStudentTerm(
    @Param('studentId') studentId: string,
    @Param('termId') termId: string,
  ): Promise<BulletinResponseDto | null> {
    return this.bulletinService.findByStudentAndTerm(studentId, termId);
  }

  @Get('by-class/:classId/:termId')
  byClassTerm(
    @Param('classId') classId: string,
    @Param('termId') termId: string,
  ): Promise<BulletinResponseDto[]> {
    return this.bulletinService.findByClassAndTerm(classId, termId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBulletinDto,
  ): Promise<BulletinResponseDto> {
    return this.bulletinService.update(id, dto);
  }

  @Patch(':id/generate')
  @ApiOperation({ summary: 'Marquer le bulletin comme généré' })
  generate(
    @Param('id') id: string,
    @Body() dto: GenerateBulletinDto,
  ): Promise<BulletinResponseDto> {
    return this.bulletinService.generate(id, dto);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publier le bulletin' })
  publish(
    @Param('id') id: string,
    @Body() dto: PublishBulletinDto,
  ): Promise<BulletinResponseDto> {
    return this.bulletinService.publish(id, dto);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archiver le bulletin' })
  archive(
    @Param('id') id: string,
    @Body() dto: ArchiveBulletinDto,
  ): Promise<BulletinResponseDto> {
    return this.bulletinService.archive(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bulletinService.remove(id);
  }
}
