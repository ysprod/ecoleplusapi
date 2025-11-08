import { Model } from 'mongoose';
import { ActivityCreateDto } from '../dtos/activity-create.dto';
import { ActivityUpdateDto } from '../dtos/activity-update.dto';
import { Activity } from '../entities/activity.entity';
import { IActivityRepository } from './IActivityRepository';
export declare class ActivityRepository implements IActivityRepository {
    private readonly activityModel;
    constructor(activityModel: Model<Activity>);
    findBySchool(schoolId: string): Promise<Activity[]>;
    create(activityData: ActivityCreateDto): Promise<Activity>;
    updateById(updateData: ActivityUpdateDto): Promise<Activity | null>;
    deleteById(id: string): Promise<void>;
}
