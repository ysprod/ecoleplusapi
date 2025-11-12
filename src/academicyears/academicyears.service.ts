import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import {
  AcademicYear,
  AcademicYearDocument,
} from './schemas/academic-year.schema';
import { SchoolService } from '../school/school.service';
import { TransactionService } from '../shared/transaction.service';
import { ValidationService } from '../shared/validation.service';
import { User } from 'src/user/schemas/user.schema';
import { Term, TermDocument, TermType } from '../term/schemas/term.schema';

function tNameFromIndex(index: number) {
  if (index === 1) return '1er Trimestre';
  if (index === 2) return '2ème Trimestre';
  return `${index}ème Trimestre`;
}

@Injectable()
export class AcademicYearsService {
  constructor(
    @InjectModel(AcademicYear.name)
    private academicYearModel: Model<AcademicYearDocument>,
    @InjectModel(Term.name) private termModel: Model<TermDocument>,
    private readonly schoolService: SchoolService,
  ) {}

  async create(
    createDto: Partial<AcademicYear>,
    session?: ClientSession,
  ): Promise<AcademicYearDocument> {
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

  async addSchoolToAcademicYear(
    academicYearId: string,
    schoolId: string,
    session?: ClientSession,
  ): Promise<void> {
    ValidationService.validateObjectId(academicYearId);
    ValidationService.validateObjectId(schoolId);
    await this.academicYearModel.findByIdAndUpdate(
      academicYearId,
      { $addToSet: { schools: new Types.ObjectId(schoolId) } },
      { session },
    );
  }

  async removeSchoolFromAcademicYear(
    academicYearId: string,
    schoolId: string,
    session?: ClientSession,
  ): Promise<void> {
    ValidationService.validateObjectId(academicYearId);
    ValidationService.validateObjectId(schoolId);
    await this.academicYearModel.findByIdAndUpdate(
      academicYearId,
      { $pull: { schools: new Types.ObjectId(schoolId) } },
      { session },
    );
  }

  async deactivateOtherCurrentYears(
    userId: string,
    currentYearId: string,
    session?: ClientSession,
  ): Promise<void> {
    await this.academicYearModel.updateMany(
      {
        user: new Types.ObjectId(userId),
        _id: { $ne: new Types.ObjectId(currentYearId) },
        isCurrent: true,
      },
      { isCurrent: false },
      { session },
    );
  }

  async createWithSchoolTransaction(
    academicYearDto: any,
    schoolId: string,
  ): Promise<{ academicYear: AcademicYearDocument }> {
    // Use a transaction so academic year, school relation and terms are created atomically
    return TransactionService.runInTransaction(async (session) => {
      // Correction : conversion du champ user en ObjectId si besoin
      if (academicYearDto.user && typeof academicYearDto.user === 'string') {
        academicYearDto.user = new Types.ObjectId(academicYearDto.user);
      }

      // Create the academic year within the session
      const createdYear = await this.create(academicYearDto, session);
      const createdYearId = (createdYear._id as Types.ObjectId).toString();

      // Link school <-> academicYear
      await this.addSchoolToAcademicYear(createdYearId, schoolId, session);
      await this.schoolService.addAcademicYear(
        schoolId,
        createdYearId,
        session,
      );

      // If requested, create terms for this academic year
      const createdTermIds: string[] = [];
      const autoGenerate = !!academicYearDto.autoGenerateTerms;
      const customTerms = Array.isArray(academicYearDto.customTerms)
        ? academicYearDto.customTerms
        : null;
      const numberOfTerms =
        typeof academicYearDto.numberOfTerms === 'number'
          ? academicYearDto.numberOfTerms
          : academicYearDto.numberOfTerms
            ? Number(academicYearDto.numberOfTerms)
            : 3;

      if (autoGenerate) {
        if (customTerms && customTerms.length > 0) {
          // Create the provided custom terms
          for (const t of customTerms) {
            const termDoc = new this.termModel({
              name: t.name,
              type: t.type ?? undefined,
              startDate: new Date(t.startDate),
              endDate: new Date(t.endDate),
              academicYear: createdYear._id,
              school: new Types.ObjectId(schoolId),
            });
            const saved = await termDoc.save({ session });
            createdTermIds.push(saved._id.toString());
          }
        } else {
          // Auto-split the academic year date range into numberOfTerms parts
          const start = new Date(createdYear.startDate);
          const end = new Date(createdYear.endDate);
          if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end) {
            const totalMs = end.getTime() - start.getTime();
            const partMs = Math.floor(totalMs / numberOfTerms);
            for (let i = 0; i < numberOfTerms; i++) {
              const partStart = new Date(start.getTime() + partMs * i);
              // ensure end of last part is the academicYear end
              const partEnd =
                i === numberOfTerms - 1
                  ? new Date(end)
                  : new Date(start.getTime() + partMs * (i + 1));

              const type =
                i === 0
                  ? TermType.FIRST
                  : i === 1
                    ? TermType.SECOND
                    : TermType.THIRD;

              const name = tNameFromIndex(i + 1);

              const termDoc = new this.termModel({
                name,
                type,
                startDate: partStart,
                endDate: partEnd,
                academicYear: createdYear._id,
                school: new Types.ObjectId(schoolId),
              });
              const saved = await termDoc.save({ session });
              createdTermIds.push(saved._id.toString());
            }
          }
        }

        // Attach terms to academic year
        if (createdTermIds.length > 0) {
          await this.academicYearModel.findByIdAndUpdate(
            createdYear._id,
            { $set: { terms: createdTermIds } },
            { session },
          );
        }
      }

      // If this year is current, deactivate others (within session)
      if (academicYearDto.isCurrent) {
        await this.deactivateOtherCurrentYears(
          (academicYearDto.user as unknown as Types.ObjectId).toString(),
          createdYearId,
          session,
        );
      }

      // Return the created academic year (fresh from DB with populated schools)
      const populated = await this.academicYearModel
        .findById(createdYear._id)
        .populate('schools')
        .session(session)
        .exec();

      return { academicYear: populated as AcademicYearDocument };
    });
  }

  // Optimized composite flows aligned with requested pattern
  async getAcademicYearsWithSchools(
    userid?: any,
  ): Promise<AcademicYearDocument[]> {
    if (!userid || !Types.ObjectId.isValid(userid)) return [];
    const userObjectId = new Types.ObjectId(userid);
    return this.academicYearModel
      .find({ user: userObjectId })
      .populate('schools')
      .exec();
  }

  async updateSchoolWithAcademicYear(
    data: { id: string } & Partial<AcademicYear>,
  ): Promise<AcademicYearDocument> {
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

  async deleteSchoolWithAcademicYear(params: {
    schoolId: string;
    academicYearId: string;
  }) {
    const { schoolId, academicYearId } = params;
    ValidationService.validateObjectId(schoolId);
    ValidationService.validateObjectId(academicYearId);

    return TransactionService.runInTransaction(async (session) => {
      await this.removeSchoolFromAcademicYear(
        academicYearId,
        schoolId,
        session,
      );

      const deletedYear = await this.academicYearModel
        .findByIdAndDelete(academicYearId)
        .session(session)
        .exec();
      if (!deletedYear) throw new NotFoundException('Academic year not found');

      await this.schoolService.delete(schoolId);

      return {
        message: 'Academic year and school deleted successfully',
        academicYearId,
        schoolId,
      };
    });
  }

  async createSchoolWithAcademicYear(payload: {
    schoolId: string;
    academicYear: any;
  }) {
    const { schoolId, academicYear } = payload;
    ValidationService.validateObjectId(schoolId);
    return this.createWithSchoolTransaction(academicYear, schoolId);
  }
}
