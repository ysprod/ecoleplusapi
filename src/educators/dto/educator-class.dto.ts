import { Types } from 'mongoose';

export class EducatorClassDto {
  _id: Types.ObjectId;
  id?: string;
  name: string;
  level: string;
  school: Types.ObjectId;
  educator: any;
  educatorDetails?: any;
}
