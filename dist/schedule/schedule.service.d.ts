import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schemas/schedule.schema';
import { ScheduleEventDto } from './dto/schedule-event.dto';
export declare class ScheduleService {
    private scheduleModel;
    constructor(scheduleModel: Model<ScheduleDocument>);
    getAllSchedules(): Promise<Schedule[]>;
    createSchedule(data: ScheduleEventDto): Promise<Schedule>;
    getScheduleByClass(classId: string): Promise<Schedule[]>;
    deleteByClassId(classId: string): Promise<void>;
}
