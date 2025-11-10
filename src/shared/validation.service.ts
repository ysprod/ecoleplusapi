import { Types } from 'mongoose';

export class ValidationService {
  static validateObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('INVALID_OBJECT_ID');
    }
  }
}
