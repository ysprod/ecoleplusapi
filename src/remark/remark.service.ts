import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Remark, RemarkDocument } from './schemas/remark.schema';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';
import { RemarkResponseDto } from './dto/remark-response.dto';

@Injectable()
export class RemarkService {
  constructor(
    @InjectModel(Remark.name) private remarkModel: Model<RemarkDocument>,
  ) {}

  private map(doc: RemarkDocument): RemarkResponseDto {
    return {
      id: doc._id.toString(),
      student: doc.student.toString(),
      term: doc.term.toString(),
      academicYear: doc.academicYear.toString(),
      type: doc.type,
      content: doc.content,
      author: doc.author?.toString(),
      subject: doc.subject?.toString(),
      authorName: doc.authorName,
      authorTitle: doc.authorTitle,
      createdAt: doc.createdAt!,
      updatedAt: doc.updatedAt!,
    };
  }

  async create(dto: CreateRemarkDto): Promise<RemarkResponseDto> {
    const created = new this.remarkModel({
      ...dto,
      student: new Types.ObjectId(dto.student),
      term: new Types.ObjectId(dto.term),
      academicYear: new Types.ObjectId(dto.academicYear),
      author: dto.author ? new Types.ObjectId(dto.author) : undefined,
      subject: dto.subject ? new Types.ObjectId(dto.subject) : undefined,
    });
    const saved = await created.save();
    return this.map(saved);
  }

  async findById(id: string): Promise<RemarkResponseDto> {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Remark not found');
    const doc = await this.remarkModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Remark not found');
    return this.map(doc);
  }

  async findByStudentAndTerm(
    studentId: string,
    termId: string,
    type?: string,
  ): Promise<RemarkResponseDto[]> {
    const query: any = { student: studentId, term: termId };
    if (type) query.type = type;
    const docs = await this.remarkModel.find(query).exec();
    return docs.map((d) => this.map(d));
  }

  async update(id: string, dto: UpdateRemarkDto): Promise<RemarkResponseDto> {
    const update: any = { ...dto };
    if (dto.student) update.student = new Types.ObjectId(dto.student);
    if (dto.term) update.term = new Types.ObjectId(dto.term);
    if (dto.academicYear)
      update.academicYear = new Types.ObjectId(dto.academicYear);
    if (dto.author) update.author = new Types.ObjectId(dto.author);
    if (dto.subject) update.subject = new Types.ObjectId(dto.subject);
    const doc = await this.remarkModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!doc) throw new NotFoundException('Remark not found');
    return this.map(doc);
  }

  async remove(id: string): Promise<void> {
    const res = await this.remarkModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Remark not found');
  }
}
