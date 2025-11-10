import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ActivityCreateDto } from './dtos/activity-create.dto';
import { ActivityUpdateDto } from './dtos/activity-update.dto';
import { ActivityService } from './services/activity.service';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getActivities(@Query('schoolId') schoolId: string) {
    return this.activityService.getActivitiesBySchool(schoolId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createActivity(@Body() body: ActivityCreateDto) {
    return this.activityService.createActivity(body);
  }

  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updateData: ActivityUpdateDto,
  ) {
    return this.activityService.updateActivity({ ...updateData, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteActivity(@Param('id') id: string) {
    await this.activityService.deleteActivity(id);
  }
}
