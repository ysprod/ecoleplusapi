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
      console.log("Creating subject with data:", createSubjectDto);
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
      .populate('school', 'nom')
      .populate('academicYear', 'name')
      .populate('mainTeacher', 'firstName lastName')
      .populate('classes', 'name level')
      .sort({ isCore: -1, name: 1 })
      .exec();
  }

  async findBySchool(schoolId: string, academicYearId?: string): Promise<Subject[]> {
    const query: any = { school: schoolId, status: { $ne: 'archived' } };
    if (academicYearId) {
      query.academicYear = academicYearId;
    }
    return this.subjectModel
      .find(query)
      .populate('academicYear', 'name')
      .populate('mainTeacher', 'firstName lastName')
      .populate('classes', 'name level')
      .sort({ name: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectModel
      .findById(id)
      .populate('school', 'nom')
      .populate('academicYear', 'name')
      .populate('mainTeacher', 'firstName lastName')
      .populate('classes', 'name level')
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
