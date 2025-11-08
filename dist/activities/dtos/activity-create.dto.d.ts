declare class ScheduleDto {
    day: string;
    startTime: string;
    endTime: string;
}
export declare class ActivityCreateDto {
    school: string;
    name: string;
    description?: string;
    category?: string;
    level?: string;
    schedule: ScheduleDto;
    location: string;
    maxParticipants?: number;
    currentParticipants?: number;
    animator: string;
    price?: number;
    isActive?: boolean;
}
export {};
