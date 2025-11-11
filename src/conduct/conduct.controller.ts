import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConductService } from './conduct.service';
import { CreateConductDto } from './dto/create-conduct.dto';
import { UpdateConductDto } from './dto/update-conduct.dto';
import { ConductResponseDto } from './dto/conduct-response.dto';

@ApiTags('conducts')
@Controller('conducts')
export class ConductController {
  constructor(private readonly conductService: ConductService) {}

  @Post()
  async create(@Body() dto: CreateConductDto): Promise<ConductResponseDto> {
    return this.conductService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ConductResponseDto> {
    return this.conductService.findById(id);
  }

  @Get('by-student/:studentId/:termId')
  async byStudentTerm(
    @Param('studentId') studentId: string,
    @Param('termId') termId: string,
  ): Promise<ConductResponseDto | null> {
    return this.conductService.findByStudentAndTerm(studentId, termId);
  }

  @Get('by-class/:classId/:termId')
  async byClassTerm(
    @Param('classId') classId: string,
    @Param('termId') termId: string,
  ): Promise<ConductResponseDto[]> {
    return this.conductService.findByClassAndTerm(classId, termId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConductDto,
  ): Promise<ConductResponseDto> {
    return this.conductService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.conductService.remove(id);
  }
}
