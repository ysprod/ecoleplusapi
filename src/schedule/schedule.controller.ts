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
import { ScheduleService } from './schedule.service';
import { ScheduleEventDto } from './dto/schedule-event.dto';

@ApiTags('schedules')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les emplois du temps' })
  getAll(@Query('classId') classId?: string) {
    if (classId) {
      return this.scheduleService.getScheduleByClass(classId);
    }
    return this.scheduleService.getAllSchedules();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un emploi du temps' })
  create(@Body() dto: ScheduleEventDto) {
    return this.scheduleService.createSchedule(dto);
  }

  @Delete('class/:classId')
  @ApiOperation({ summary: "Supprimer tous les emplois du temps d'une classe" })
  deleteByClass(@Param('classId') classId: string) {
    return this.scheduleService.deleteByClassId(classId);
  }
}
