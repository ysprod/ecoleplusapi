import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { AcademicYear, AcademicYearDocument } from './schemas/academic-year.schema';
import { SchoolService } from '../school/school.service';
import { TransactionService } from '../shared/transaction.service';
import { ValidationService } from '../shared/validation.service';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AcademicYearsService {
  constructor(
    @InjectModel(AcademicYear.name) private academicYearModel: Model<AcademicYearDocument>,
    private readonly schoolService: SchoolService,
  ) { }

  async create(createDto: Partial<AcademicYear>, session?: ClientSession): Promise<AcademicYearDocument> {
    const created = new this.academicYearModel(createDto);
    return created.save({ session });
  }

  async findAll(): Promise<AcademicYearDocument[]> {
    return this.academicYearModel.find().populate('schools').exec();
  }

  async findOne(id: string): Promise<AcademicYearDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Academic year not found');
    }
    return this.academicYearModel.findById(id).populate('schools').exec();
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Academic year not found');
    }
    await this.academicYearModel.findByIdAndDelete(id).exec();
  }

  async addSchoolToAcademicYear(academicYearId: string, schoolId: string, session?: ClientSession): Promise<void> {
    ValidationService.validateObjectId(academicYearId);
    ValidationService.validateObjectId(schoolId);
    await this.academicYearModel.findByIdAndUpdate(
      academicYearId,
      { $addToSet: { schools: new Types.ObjectId(schoolId) } },
      { session },
    );
  }

  async removeSchoolFromAcademicYear(academicYearId: string, schoolId: string, session?: ClientSession): Promise<void> {
    ValidationService.validateObjectId(academicYearId);
    ValidationService.validateObjectId(schoolId);
    await this.academicYearModel.findByIdAndUpdate(
      academicYearId,
      { $pull: { schools: new Types.ObjectId(schoolId) } },
      { session },
    );
  }

  async deactivateOtherCurrentYears(userId: string, currentYearId: string, session?: ClientSession): Promise<void> {
    await this.academicYearModel.updateMany(
      { user: new Types.ObjectId(userId), _id: { $ne: new Types.ObjectId(currentYearId) }, isCurrent: true },
      { isCurrent: false },
      { session },
    );
  }

  async createWithSchoolTransaction(
    academicYearDto: any,
    schoolId: string,
  ): Promise<{ academicYear: AcademicYearDocument }> {
    // Correction : conversion du champ user en ObjectId si besoin
    if (academicYearDto.user && typeof academicYearDto.user === 'string') {
      academicYearDto.user = new Types.ObjectId(academicYearDto.user);
    }

    const createdYear = await this.create(academicYearDto);
    const createdYearId = (createdYear._id as unknown as Types.ObjectId).toString();
    await this.addSchoolToAcademicYear(createdYearId, schoolId);
    await this.schoolService.addAcademicYear(schoolId, createdYearId);

    if (academicYearDto.isCurrent) {
      await this.deactivateOtherCurrentYears(
        (academicYearDto.user as unknown as Types.ObjectId).toString(),
        createdYearId,
      );
    }

    return { academicYear: createdYear };
  }

  // Optimized composite flows aligned with requested pattern
  async getAcademicYearsWithSchools(userid?: any): Promise<AcademicYearDocument[]> {
    if (!userid || !Types.ObjectId.isValid(userid)) return [];
    const userObjectId = new Types.ObjectId(userid);
    return this.academicYearModel.find({ user: userObjectId }).populate('schools').exec();
  }

  async updateSchoolWithAcademicYear(data: { id: string } & Partial<AcademicYear>): Promise<AcademicYearDocument> {
    ValidationService.validateObjectId(data.id);
    const updated = await this.academicYearModel
      .findByIdAndUpdate(data.id, { $set: { ...data } }, { new: true })
      .populate('schools')
      .exec();
    if (!updated) {
      throw new NotFoundException('Academic year not found');
    }
    return updated;
  }

  async deleteSchoolWithAcademicYear(params: { schoolId: string; academicYearId: string }) {
    const { schoolId, academicYearId } = params;
    ValidationService.validateObjectId(schoolId);
    ValidationService.validateObjectId(academicYearId);

    return TransactionService.runInTransaction(async (session) => {
      await this.removeSchoolFromAcademicYear(academicYearId, schoolId, session);

      const deletedYear = await this.academicYearModel.findByIdAndDelete(academicYearId).session(session).exec();
      if (!deletedYear) throw new NotFoundException('Academic year not found');

      await this.schoolService.delete(schoolId);

      return {
        message: 'Academic year and school deleted successfully',
        academicYearId,
        schoolId,
      };
    });
  }

  async createSchoolWithAcademicYear(payload: { schoolId: string; academicYear: any }) {
    const { schoolId, academicYear } = payload;
    ValidationService.validateObjectId(schoolId);
    return this.createWithSchoolTransaction(academicYear, schoolId);
  }
}