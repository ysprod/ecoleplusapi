import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidationService } from 'src/shared/validation.service';
import { ActivityCreateDto } from '../dtos/activity-create.dto';
import { ActivityUpdateDto } from '../dtos/activity-update.dto';
import { IActivityService } from '../interfaces/IActivityService';
import { ActivityRepository } from '../interfaces/activity.repository';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivityService implements IActivityService {
  constructor(
    private readonly repository: ActivityRepository,
    private readonly validationService: ValidationService,
  ) {}

  async getActivitiesBySchool(schoolId: string): Promise<any[]> {
    ValidationService.validateObjectId(schoolId);
    return this.repository.findBySchool(schoolId);
  }

  async createActivity(body: ActivityCreateDto): Promise<Activity> {
    const activitycreated = await this.repository.create(body);
    // You might want to inject user service here if needed
    return activitycreated;
  }

  async updateActivity(updateData: ActivityUpdateDto): Promise<any> {
    ValidationService.validateObjectId(updateData.id!);
    const result = await this.repository.updateById(updateData);
    if (!result) {
      throw new NotFoundException('Activity not found');
    }
    return result;
  }

  async deleteActivity(id: string): Promise<void> {
    ValidationService.validateObjectId(id);
    await this.repository.deleteById(id);
  }
}
