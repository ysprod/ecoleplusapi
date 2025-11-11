import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conduct, ConductDocument } from './schemas/conduct.schema';
import { CreateConductDto } from './dto/create-conduct.dto';
import { UpdateConductDto } from './dto/update-conduct.dto';
import { ConductResponseDto } from './dto/conduct-response.dto';

@Injectable()
export class ConductService {
  constructor(
    @InjectModel(Conduct.name) private conductModel: Model<ConductDocument>,
  ) {}

  private map(doc: ConductDocument): ConductResponseDto {
    return {
      id: doc._id.toString(),
      student: doc.student.toString(),
      class: doc.class.toString(),
      term: doc.term.toString(),
      academicYear: doc.academicYear.toString(),
      discipline: doc.discipline,
      behavior: doc.behavior,
      participation: doc.participation,
      workHabits: doc.workHabits,
      absences: doc.absences,
      justifiedAbsences: doc.justifiedAbsences,
      lates: doc.lates,
      sanctions: doc.sanctions,
      attendanceRate: doc.attendanceRate,
      generalRemarks: doc.generalRemarks,
      sanctionsList: doc.sanctionsList?.map((s) => ({
        date: s.date,
        type: s.type,
        reason: s.reason,
        teacher: s.teacher?.toString(),
      })),
      createdAt: doc.createdAt!,
      updatedAt: doc.updatedAt!,
    };
  }

  async create(dto: CreateConductDto): Promise<ConductResponseDto> {
    const created = new this.conductModel({
      ...dto,
      student: new Types.ObjectId(dto.student),
      class: new Types.ObjectId(dto.class),
      term: new Types.ObjectId(dto.term),
      academicYear: new Types.ObjectId(dto.academicYear),
      sanctionsList: dto.sanctionsList?.map((s) => ({
        date: new Date(s.date),
        type: s.type,
        reason: s.reason,
        teacher: new Types.ObjectId(s.teacher),
      })),
    });
    const saved = await created.save();
    return this.map(saved);
  }

  async findById(id: string): Promise<ConductResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Conduct not found');
    }
    const found = await this.conductModel.findById(id).exec();
    if (!found) throw new NotFoundException('Conduct not found');
    return this.map(found);
  }

  async findByStudentAndTerm(
    studentId: string,
    termId: string,
  ): Promise<ConductResponseDto | null> {
    const doc = await this.conductModel
      .findOne({ student: studentId, term: termId })
      .exec();
    return doc ? this.map(doc) : null;
  }

  async findByClassAndTerm(
    classId: string,
    termId: string,
  ): Promise<ConductResponseDto[]> {
    const docs = await this.conductModel
      .find({ class: classId, term: termId })
      .exec();
    return docs.map((d) => this.map(d));
  }

  async update(id: string, dto: UpdateConductDto): Promise<ConductResponseDto> {
    const updateDoc: any = { ...dto };
    if (dto.student) updateDoc.student = new Types.ObjectId(dto.student);
    if (dto.class) updateDoc.class = new Types.ObjectId(dto.class);
    if (dto.term) updateDoc.term = new Types.ObjectId(dto.term);
    if (dto.academicYear)
      updateDoc.academicYear = new Types.ObjectId(dto.academicYear);
    if (dto.sanctionsList)
      updateDoc.sanctionsList = dto.sanctionsList.map((s) => ({
        date: new Date(s.date),
        type: s.type,
        reason: s.reason,
        teacher: new Types.ObjectId(s.teacher),
      }));

    const updated = await this.conductModel
      .findByIdAndUpdate(id, updateDoc, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Conduct not found');
    return this.map(updated);
  }

  async remove(id: string): Promise<void> {
    const res = await this.conductModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Conduct not found');
  }
}
