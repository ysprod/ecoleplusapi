import { Types } from 'mongoose';
export declare class AcademicYearCreateDto {
    startDate: Date;
    endDate?: Date;
    isCurrent?: boolean;
    user: Types.ObjectId | string;
    schools?: Types.ObjectId[] | string[];
}
