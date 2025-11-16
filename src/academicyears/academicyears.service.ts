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
import { ValidationService } from '../shared/validation.service';
import { User } from 'src/user/schemas/user.schema';
import { Term, TermDocument, TermType } from '../term/schemas/term.schema';
import { Class, ClassDocument } from '../class/schemas/class.schema';
import { Student, StudentDocument } from '../students/schemas/student.schema';
import { Teacher, TeacherDocument } from '../teacher/schemas/teacher.schema';
import { SubjectsService } from '../subjects/subjects.service';

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
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    private readonly schoolService: SchoolService,
    private readonly subjectsService: SubjectsService,
  ) {}

  async create(
    createDto: Partial<AcademicYear>,
    session?: ClientSession,
  ): Promise<AcademicYearDocument> {
    const created = new this.academicYearModel(createDto);
    return created.save({ session });
  }

  async findAll(): Promise<AcademicYearDocument[]> {
    // Populate schools and include a computed classesCount per school (overall, across all years)
    const years = await this.academicYearModel
      .find()
      .populate({ path: 'schools', populate: [{ path: 'classesCount' }, { path: 'teachersCount' }] })
      .exec();
    // Attach per-year student and teacher/class counts where applicable (per year)
    for (const y of years) {
      await this.attachSchoolCountsForYear(y);
    }
    return years;
  }

  async findOne(id: string): Promise<AcademicYearDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Academic year not found');
    }
    // Populate schools and include classesCount restricted to this academic year
    const yearId = new Types.ObjectId(id);
    const doc = await this.academicYearModel
      .findById(id)
      .populate({
        path: 'schools',
        populate: [
          { path: 'classesCount', match: { academicYear: yearId } },
          { path: 'teachersCount' },
        ],
      })
      .exec();
    if (doc) await this.attachSchoolCountsForYear(doc);
    return doc;
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
    // Correction : conversion du champ user en ObjectId si besoin
    if (academicYearDto.user && typeof academicYearDto.user === 'string') {
      academicYearDto.user = new Types.ObjectId(academicYearDto.user);
    }

    // Create the academic year
    const createdYear = await this.create(academicYearDto);
    const createdYearId = (createdYear._id as Types.ObjectId).toString();

    // Link school <-> academicYear
    await this.addSchoolToAcademicYear(createdYearId, schoolId);
    await this.schoolService.addAcademicYear(schoolId, createdYearId);

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
          const saved = await termDoc.save();
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
            const saved = await termDoc.save();
            createdTermIds.push(saved._id.toString());
          }
        }
      }

      // Attach terms to academic year
      if (createdTermIds.length > 0) {
        await this.academicYearModel.findByIdAndUpdate(createdYear._id, {
          $set: { terms: createdTermIds },
        });
      }
    }

    // If this year is current, deactivate others
    if (academicYearDto.isCurrent) {
      await this.deactivateOtherCurrentYears(
        (academicYearDto.user as unknown as Types.ObjectId).toString(),
        createdYearId,
      );
    }

    // Return the created academic year (fresh from DB with populated schools)
    const populated = await this.academicYearModel
      .findById(createdYear._id)
      .populate({
        path: 'schools',
        populate: {
          path: 'classesCount',
          match: { academicYear: new Types.ObjectId(createdYearId) },
        },
      })
      .exec();
    if (populated) await this.attachSchoolCountsForYear(populated);

    return { academicYear: populated as AcademicYearDocument };
  }

  // Optimized composite flows aligned with requested pattern
  async getAcademicYearsWithSchools(
    userid?: any,
  ): Promise<AcademicYearDocument[]> {
    if (!userid || !Types.ObjectId.isValid(userid)) return [];
    const userObjectId = new Types.ObjectId(userid);
    const docs = await this.academicYearModel
      .find({ user: userObjectId })
      .populate({ path: 'schools', populate: [{ path: 'classesCount' }, { path: 'teachersCount' }] })
      .exec();
    for (const d of docs) {
      await this.attachSchoolCountsForYear(d);
    }
    return docs;
  }

  async updateSchoolWithAcademicYear(
    data: { id: string } & Partial<AcademicYear>,
  ): Promise<AcademicYearDocument> {
    ValidationService.validateObjectId(data.id);
    const updated = await this.academicYearModel
      .findByIdAndUpdate(data.id, { $set: { ...data } }, { new: true })
      .populate({ path: 'schools', populate: [{ path: 'classesCount' }, { path: 'teachersCount' }] })
      .exec();
    if (!updated) {
      throw new NotFoundException('Academic year not found');
    }
    await this.attachSchoolCountsForYear(updated);
    return updated;
  }

  async deleteSchoolWithAcademicYear(params: {
    schoolId: string;
    academicYearId: string;
  }) {
    const { schoolId, academicYearId } = params;
    ValidationService.validateObjectId(schoolId);
    ValidationService.validateObjectId(academicYearId);

    await this.removeSchoolFromAcademicYear(academicYearId, schoolId);

    const deletedYear = await this.academicYearModel
      .findByIdAndDelete(academicYearId)
      .exec();
    if (!deletedYear) throw new NotFoundException('Academic year not found');

    await this.schoolService.delete(schoolId);

    return {
      message: 'Academic year and school deleted successfully',
      academicYearId,
      schoolId,
    };
  }

  async createSchoolWithAcademicYear(payload: {
    schoolId: string;
    academicYear: any;
  }) {
    const { schoolId, academicYear } = payload;
    ValidationService.validateObjectId(schoolId);
    const result = await this.createWithSchoolTransaction(academicYear, schoolId);

    // Génération automatique de matières par défaut après création
    try {
      // Récupérer les cycles/niveaux de l'école pour adapter le jeu de matières
      const school = await this.schoolService.findById(schoolId);
      const createdSubjects = await this.subjectsService.bulkCreateDefaultForSchool(
        schoolId,
        (result.academicYear._id as any).toString(),
        academicYear.user?.toString?.(),
        { cycles: school?.niveaux }
      );
      return { ...result, subjects: createdSubjects };
    } catch (e) {
      console.warn('Generation des matières par défaut échouée:', e.message);
      return { ...result, subjects: [] };
    }
  }

  /**
   * Attach per-school counts (classes, students, teachers) limited to the given academic year
   */
  private async attachSchoolCountsForYear(doc: any) {
    const yearId: Types.ObjectId | null = doc?._id ? new Types.ObjectId(doc._id) : null;
    const schools = Array.isArray(doc?.schools) ? doc.schools : [];
    if (!yearId || schools.length === 0) return;

    const schoolIds = schools
      .map((s: any) => s?._id)
      .filter(Boolean)
      .map((id: any) => new Types.ObjectId(id));
    if (schoolIds.length === 0) return;

    // Classes per school for this year
    const classAgg = await this.classModel.aggregate([
      { $match: { school: { $in: schoolIds }, academicYear: yearId } },
      { $group: { _id: '$school', count: { $sum: 1 } } },
    ]);
    const classCount = new Map<string, number>(
      classAgg.map((d) => [d._id.toString(), d.count as number]),
    );

    // Students per school for this year (via class -> school join)
    const studentAgg = await this.studentModel.aggregate([
      { $match: { class: { $ne: null } } },
      {
        $lookup: {
          from: 'classes',
          localField: 'class',
          foreignField: '_id',
          as: 'cls',
        },
      },
      { $unwind: '$cls' },
      {
        $match: {
          'cls.school': { $in: schoolIds },
          'cls.academicYear': yearId,
        },
      },
      { $group: { _id: '$cls.school', count: { $sum: 1 } } },
    ]);
    const studentCount = new Map<string, number>(
      studentAgg.map((d) => [d._id.toString(), d.count as number]),
    );

    // Teachers per school for this year (teachers linked to classes in that school/year; deduplicated)
    const teacherAgg = await this.teacherModel.aggregate([
      {
        $lookup: {
          from: 'classes',
          localField: 'classes',
          foreignField: '_id',
          as: 'cls',
        },
      },
      { $unwind: '$cls' },
      {
        $match: {
          'cls.school': { $in: schoolIds },
          'cls.academicYear': yearId,
        },
      },
      { $group: { _id: '$cls.school', teachers: { $addToSet: '$_id' } } },
      { $project: { count: { $size: '$teachers' } } },
    ]);
    const teacherCount = new Map<string, number>(
      teacherAgg.map((d) => [d._id.toString(), d.count as number]),
    );

    for (const s of schools) {
      const key = s._id?.toString?.() || String(s._id);
      if (!key) continue;
      // Prefer per-year aggregation counts; fallback to existing virtuals if any
      const clsVal = classCount.get(key) ?? s.classesCount ?? 0;
      const stuVal = studentCount.get(key) ?? 0;
      const teachVal = teacherCount.get(key) ?? s.teachersCount ?? (Array.isArray(s.teachers) ? s.teachers.length : 0);

      // Assign directly
      s.classesCount = clsVal;
      s.studentsCount = stuVal;
      s.teachersCount = teachVal;

      // If it's a Mongoose document, mark as modified so toJSON includes it
      if (typeof s.set === 'function') {
        try {
          s.set('classesCount', clsVal, { strict: false });
          s.set('studentsCount', stuVal, { strict: false });
          s.set('teachersCount', teachVal, { strict: false });
        } catch {}
      }
    }
  }
}
