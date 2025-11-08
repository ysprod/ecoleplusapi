import { Types } from 'mongoose';

export class CarDto {
  _id?: Types.ObjectId;
  matricule: string;
  carmodel: string;
  year: number;
  capacity: number;
  driverName: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  age?: number;
}