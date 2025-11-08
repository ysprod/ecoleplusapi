import { Types } from 'mongoose';
export declare class AcademicYearUpdateDto {
    id: string;
    startDate?: Date;
    endDate?: Date;
    isCurrent?: boolean;
    schools?: Types.ObjectId[] | string[];
}
