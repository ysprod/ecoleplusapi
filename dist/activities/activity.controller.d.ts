import { ActivityCreateDto } from './dtos/activity-create.dto';
import { ActivityUpdateDto } from './dtos/activity-update.dto';
import { ActivityService } from './services/activity.service';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    getActivities(schoolId: string): Promise<any[]>;
    createActivity(body: ActivityCreateDto): Promise<import("./entities/activity.entity").Activity>;
    updateActivity(id: string, updateData: ActivityUpdateDto): Promise<any>;
    deleteActivity(id: string): Promise<void>;
}
