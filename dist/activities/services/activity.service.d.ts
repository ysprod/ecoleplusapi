import { ValidationService } from 'src/shared/validation.service';
import { ActivityCreateDto } from '../dtos/activity-create.dto';
import { ActivityUpdateDto } from '../dtos/activity-update.dto';
import { IActivityService } from '../interfaces/IActivityService';
import { ActivityRepository } from '../interfaces/activity.repository';
import { Activity } from '../entities/activity.entity';
export declare class ActivityService implements IActivityService {
    private readonly repository;
    private readonly validationService;
    constructor(repository: ActivityRepository, validationService: ValidationService);
    getActivitiesBySchool(schoolId: string): Promise<any[]>;
    createActivity(body: ActivityCreateDto): Promise<Activity>;
    updateActivity(updateData: ActivityUpdateDto): Promise<any>;
    deleteActivity(id: string): Promise<void>;
}
