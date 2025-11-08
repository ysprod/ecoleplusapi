import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from '../classes/schemas/class.schema';
import { Model, Types } from 'mongoose';
import { EducatorClassDto } from './dto/educator-class.dto';

@Injectable()
export class EducatorRepository {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  private mapToEducatorClassDto(classDoc: any): EducatorClassDto {
    return {
      _id: classDoc._id.toString(),
      name: classDoc.name,
      level: classDoc.level,
      school: classDoc.school?.toString?.(),
      educator: classDoc.educator ? {
        _id: classDoc.educator._id?.toString?.(),
        firstName: classDoc.educator.firstName,
        lastName: classDoc.educator.lastName,
        email: classDoc.educator.email
      } : null,
  
    };
  }

  async getClassesWithEducators(schoolId: string, niveau?: string): Promise<EducatorClassDto[]> {
    if (!schoolId || !Types.ObjectId.isValid(schoolId)) return [];
    
    const query: Record<string, any> = {
      school: new Types.ObjectId(schoolId),
      educator: { $exists: true, $ne: null }
    };
    
    if (niveau) query.level = niveau;

    const classes = await this.classModel.find(query)
      .populate({ path: 'educator', select: 'firstName lastName email _id' })
      .lean()
      .exec();

    return classes.map(this.mapToEducatorClassDto.bind(this));
  }

  async getClassesByEducator(educatorId: string): Promise<EducatorClassDto[]> {
    if (!educatorId || !Types.ObjectId.isValid(educatorId)) return [];
    
    const query = { educator: new Types.ObjectId(educatorId) };
    const classes = await this.classModel.find(query)
      .select('name level school educator')
      .lean()
      .exec();

    return classes.map(this.mapToEducatorClassDto.bind(this));
  }

  async getClassEducator(classId: string): Promise<EducatorClassDto | null> {
    if (!classId || !Types.ObjectId.isValid(classId)) return null;
    
    const classItem = await this.classModel.findById(classId)
      .populate({ path: 'educator', model: 'User', select: 'firstName lastName email _id' })
      .select('educator')
      .lean()
      .exec();

    return classItem ? this.mapToEducatorClassDto(classItem) : null;
  }
}