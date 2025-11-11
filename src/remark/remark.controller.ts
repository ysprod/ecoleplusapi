import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RemarkService } from './remark.service';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';
import { RemarkResponseDto } from './dto/remark-response.dto';

@ApiTags('remarks')
@Controller('remarks')
export class RemarkController {
  constructor(private readonly remarkService: RemarkService) {}

  @Post()
  async create(@Body() dto: CreateRemarkDto): Promise<RemarkResponseDto> {
    return this.remarkService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RemarkResponseDto> {
    return this.remarkService.findById(id);
  }

  @Get('by-student/:studentId/:termId')
  async byStudentTerm(
    @Param('studentId') studentId: string,
    @Param('termId') termId: string,
    @Query('type') type?: string,
  ): Promise<RemarkResponseDto[]> {
    return this.remarkService.findByStudentAndTerm(studentId, termId, type);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRemarkDto,
  ): Promise<RemarkResponseDto> {
    return this.remarkService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.remarkService.remove(id);
  }
}
