import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Term, TermDocument, TermStatus } from './schemas/term.schema';
import { CreateTermDto } from './dto/create-term.dto';
import {
  UpdateTermDto,
  UpdateTermStatusDto,
  PublishBulletinsDto,
} from './dto/update-term.dto';

@Injectable()
export class TermService {
  constructor(@InjectModel(Term.name) private termModel: Model<TermDocument>) {}

  async create(dto: CreateTermDto): Promise<Term> {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new BadRequestException('startDate doit être antérieure à endDate');
    }

    try {
      const term = new this.termModel({
        ...dto,
        academicYear: new Types.ObjectId(dto.academicYear),
        school: new Types.ObjectId(dto.school),
      });
      return await term.save();
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new BadRequestException(
          'Un trimestre de ce type existe déjà pour cette école et année académique',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Term[]> {
    return this.termModel.find().sort({ startDate: 1 }).exec();
  }

  async findByYear(school: string, academicYear: string): Promise<Term[]> {
    return this.termModel
      .find({
        school: new Types.ObjectId(school),
        academicYear: new Types.ObjectId(academicYear),
      })
      .sort({ startDate: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Term> {
    const term = await this.termModel.findById(id).exec();
    if (!term) throw new NotFoundException('Trimestre introuvable');
    return term;
  }

  async update(id: string, dto: UpdateTermDto): Promise<Term> {
    if (dto.startDate && dto.endDate) {
      const start = new Date(dto.startDate);
      const end = new Date(dto.endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
        throw new BadRequestException(
          'startDate doit être antérieure à endDate',
        );
      }
    }
    const term = await this.termModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!term) throw new NotFoundException('Trimestre introuvable');
    return term;
  }

  async remove(id: string): Promise<void> {
    const res = await this.termModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Trimestre introuvable');
  }

  async updateStatus(id: string, dto: UpdateTermStatusDto): Promise<Term> {
    const term = await this.termModel
      .findByIdAndUpdate(id, { status: dto.status }, { new: true })
      .exec();
    if (!term) throw new NotFoundException('Trimestre introuvable');
    return term;
  }

  async publishBulletins(id: string, dto: PublishBulletinsDto): Promise<Term> {
    const publishedAt = dto.publishedAt
      ? new Date(dto.publishedAt)
      : new Date();
    const term = await this.termModel
      .findByIdAndUpdate(
        id,
        { bulletinsPublished: true, publishedAt, status: TermStatus.CLOSED },
        { new: true },
      )
      .exec();
    if (!term) throw new NotFoundException('Trimestre introuvable');
    return term;
  }
}
