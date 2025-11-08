import { Types } from 'mongoose';

export class AcademicYearDto {
  _id?: Types.ObjectId | string;
  startDate!: Date;
  endDate?: Date;
  isCurrent?: boolean;
  user!: Types.ObjectId | string;
  schools?: Types.ObjectId[] | string[];
}
