import { ClassDto } from 'src/classes/dto/class.dto';
export declare class ScheduleEventDTO {
    id: string;
    classId: string;
    _id?: string;
    title?: string;
    start?: Date;
    end?: Date;
    color?: string;
    day: string;
    hour: string;
    subject: string;
    teacherName: string;
    class?: ClassDto;
    class_Id?: string;
    allDay?: boolean;
    editable?: boolean;
    resizable?: boolean;
}
