import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from './schemas/subject.schema';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      const subject = new this.subjectModel(createSubjectDto);
      return await subject.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Ce code de matière existe déjà pour cette année académique',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectModel
      .find({ status: { $ne: 'archived' } })
      .populate('school', 'name')
      .populate('academicYear', 'name')
      .populate('teacher', 'name')
      .sort({ isCore: -1, name: 1 })
      .exec();
  }

  async findBySchool(schoolId: string): Promise<Subject[]> {
    return this.subjectModel
      .find({ school: schoolId, status: { $ne: 'archived' } })
      .populate('academicYear', 'name')
      .populate('teacher', 'name')
      .sort({ name: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectModel
      .findById(id)
      .populate('school', 'name')
      .populate('academicYear', 'name')
      .populate('teacher', 'name')
      .populate('prerequisites', 'name code')
      .populate('coRequisites', 'name code')
      .exec();

    if (!subject) {
      throw new NotFoundException('Matière non trouvée');
    }
    return subject;
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.subjectModel
      .findByIdAndUpdate(id, updateSubjectDto, { new: true })
      .exec();

    if (!subject) {
      throw new NotFoundException('Matière non trouvée');
    }
    return subject;
  }

  async remove(id: string): Promise<void> {
    const result = await this.subjectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Matière non trouvée');
    }
  }

  async archive(id: string): Promise<Subject> {
    return this.update(id, { status: 'archived' });
  }

  getSubjects(): string[] {
    return ['Mathématiques', 'Physique', 'Chimie', 'Histoire', 'Géographie'];
  }
}
