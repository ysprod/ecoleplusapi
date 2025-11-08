import { ScheduleService } from './schedule.service';
import { ScheduleEventDto } from './dto/schedule-event.dto';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    getAll(classId?: string): Promise<import("./schemas/schedule.schema").Schedule[]>;
    create(dto: ScheduleEventDto): Promise<import("./schemas/schedule.schema").Schedule>;
    deleteByClass(classId: string): Promise<void>;
}
