import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Bulletin,
  BulletinDocument,
  BulletinStatus,
} from './schemas/bulletin.schema';
import { CreateBulletinDto } from './dto/create-bulletin.dto';
import { UpdateBulletinDto } from './dto/update-bulletin.dto';
import { BulletinResponseDto } from './dto/bulletin-response.dto';
import {
  ArchiveBulletinDto,
  GenerateBulletinDto,
  PublishBulletinDto,
} from './dto/actions.dto';

@Injectable()
export class BulletinService {
  constructor(
    @InjectModel(Bulletin.name) private bulletinModel: Model<BulletinDocument>,
  ) {}

  private map(doc: BulletinDocument): BulletinResponseDto {
    return {
      id: doc._id.toString(),
      student: doc.student.toString(),
      class: doc.class.toString(),
      term: doc.term.toString(),
      academicYear: doc.academicYear.toString(),
      school: doc.school.toString(),
      grades: (doc.grades || []).map((g) => ({
        subject: g.subject.toString(),
        coefficient: g.coefficient,
        interrogation: g.interrogation,
        devoir: g.devoir,
        composition: g.composition,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher?.toString(),
        teacherName: g.teacherName,
      })),
      statistics: {
        generalAverage: doc.statistics.generalAverage,
        classAverage: doc.statistics.classAverage,
        rank: doc.statistics.rank,
        totalStudents: doc.statistics.totalStudents,
        highestAverage: doc.statistics.highestAverage,
        lowestAverage: doc.statistics.lowestAverage,
        totalCoefficients: doc.statistics.totalCoefficients,
      },
      conduct: doc.conduct?.toString(),
      remarks: doc.remarks?.map((r) => r.toString()),
      decision: doc.decision,
      status: doc.status,
      generatedAt: doc.generatedAt,
      publishedAt: doc.publishedAt,
      generatedBy: doc.generatedBy?.toString(),
      publishedBy: doc.publishedBy?.toString(),
      pdfUrl: doc.pdfUrl,
      parentNotified: doc.parentNotified,
      parentNotifiedAt: doc.parentNotifiedAt,
      downloaded: doc.downloaded,
      downloadedAt: doc.downloadedAt,
      createdAt: doc.createdAt!,
      updatedAt: doc.updatedAt!,
    };
  }

  async create(dto: CreateBulletinDto): Promise<BulletinResponseDto> {
    const created = new this.bulletinModel({
      ...dto,
      student: new Types.ObjectId(dto.student),
      class: new Types.ObjectId(dto.class),
      term: new Types.ObjectId(dto.term),
      academicYear: new Types.ObjectId(dto.academicYear),
      school: new Types.ObjectId(dto.school),
      grades: dto.grades.map((g) => ({
        subject: new Types.ObjectId(g.subject),
        coefficient: g.coefficient,
        interrogation: g.interrogation ?? 0,
        devoir: g.devoir ?? 0,
        composition: g.composition ?? 0,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher ? new Types.ObjectId(g.teacher) : undefined,
        teacherName: g.teacherName,
      })),
      statistics: dto.statistics,
      conduct: dto.conduct ? new Types.ObjectId(dto.conduct) : undefined,
      remarks: dto.remarks?.map((r) => new Types.ObjectId(r)),
    });
    const saved = await created.save();
    return this.map(saved);
  }

  async findById(id: string): Promise<BulletinResponseDto> {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Bulletin not found');
    const doc = await this.bulletinModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async findByStudentAndTerm(
    studentId: string,
    termId: string,
  ): Promise<BulletinResponseDto | null> {
    const doc = await this.bulletinModel
      .findOne({ student: studentId, term: termId })
      .exec();
    return doc ? this.map(doc) : null;
  }

  async findByClassAndTerm(
    classId: string,
    termId: string,
  ): Promise<BulletinResponseDto[]> {
    const docs = await this.bulletinModel
      .find({ class: classId, term: termId })
      .exec();
    return docs.map((d) => this.map(d));
  }

  async update(
    id: string,
    dto: UpdateBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = { ...dto };
    if (dto.student) update.student = new Types.ObjectId(dto.student);
    if (dto.class) update.class = new Types.ObjectId(dto.class);
    if (dto.term) update.term = new Types.ObjectId(dto.term);
    if (dto.academicYear)
      update.academicYear = new Types.ObjectId(dto.academicYear);
    if (dto.school) update.school = new Types.ObjectId(dto.school);
    if (dto.conduct) update.conduct = new Types.ObjectId(dto.conduct);
    if (dto.remarks)
      update.remarks = dto.remarks.map((r) => new Types.ObjectId(r));
    if (dto.grades)
      update.grades = dto.grades.map((g) => ({
        subject: new Types.ObjectId(g.subject),
        coefficient: g.coefficient,
        interrogation: g.interrogation ?? 0,
        devoir: g.devoir ?? 0,
        composition: g.composition ?? 0,
        moyenne: g.moyenne,
        appreciation: g.appreciation,
        rank: g.rank,
        teacher: g.teacher ? new Types.ObjectId(g.teacher) : undefined,
        teacherName: g.teacherName,
      }));

    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async remove(id: string): Promise<void> {
    const res = await this.bulletinModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Bulletin not found');
  }

  async generate(
    id: string,
    dto: GenerateBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = {
      status: BulletinStatus.GENERATED,
      generatedAt: new Date(),
    };
    if (dto.generatedBy)
      update.generatedBy = new Types.ObjectId(dto.generatedBy);
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async publish(
    id: string,
    dto: PublishBulletinDto,
  ): Promise<BulletinResponseDto> {
    const update: any = {
      status: BulletinStatus.PUBLISHED,
      publishedAt: new Date(),
    };
    if (dto.publishedBy)
      update.publishedBy = new Types.ObjectId(dto.publishedBy);
    if (dto.pdfUrl) update.pdfUrl = dto.pdfUrl;
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }

  async archive(
    id: string,
    _dto: ArchiveBulletinDto,
  ): Promise<BulletinResponseDto> {
    const doc = await this.bulletinModel
      .findByIdAndUpdate(id, { status: BulletinStatus.ARCHIVED }, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Bulletin not found');
    return this.map(doc);
  }
}
