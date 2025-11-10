import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Class } from '../class/schemas/class.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SchoolResponseDto } from './dto/school-response.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './schemas/school.schema';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) {}

  async create(
    createSchoolDto: CreateSchoolDto,
    userId: string,
    session?: ClientSession,
  ): Promise<SchoolResponseDto> {
    const existingSchool = await this.schoolModel
      .findOne({ email: createSchoolDto.email })
      .session(session || null);
    if (existingSchool) {
      throw new Error('Une école avec cet email existe déjà');
    }

    const createdSchool = new this.schoolModel({
      ...createSchoolDto,
      user: userId,
      createdBy: userId,
    });

    const savedSchool = await createdSchool.save({ session });
    return this.mapToResponseDto(savedSchool);
  }

  async update(
    updateSchoolDto: UpdateSchoolDto,
    userId: string,
  ): Promise<SchoolResponseDto> {
    const updatedSchool = await this.schoolModel
      .findByIdAndUpdate(
        updateSchoolDto.id,
        { ...updateSchoolDto, updatedBy: userId },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedSchool) {
      throw new NotFoundException('School not found');
    }

    return this.mapToResponseDto(updatedSchool);
  }

  async findAll(): Promise<SchoolResponseDto[]> {
    const schools = await this.schoolModel.find().populate('classes').exec();
    return schools.map((school) => this.mapToResponseDto(school));
  }

  async findById(id: string): Promise<SchoolResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('School not found');
    }
    const school = await this.schoolModel.findById(id).exec();
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return this.mapToResponseDto(school);
  }

  async findByEmail(email: string): Promise<SchoolResponseDto | null> {
    const school = await this.schoolModel.findOne({ email }).exec();
    if (!school) {
      return null;
    }
    return this.mapToResponseDto(school);
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('School not found');
    }
    await this.schoolModel.findByIdAndDelete(id).exec();
  }

  async addTeacher(
    schoolId: string,
    teacherId: string,
    session?: ClientSession,
  ): Promise<SchoolResponseDto> {
    const updatedSchool = await this.schoolModel
      .findByIdAndUpdate(
        schoolId,
        { $addToSet: { teachers: teacherId } },
        { new: true, session },
      )
      .exec();

    if (!updatedSchool) {
      throw new NotFoundException('School not found');
    }

    return this.mapToResponseDto(updatedSchool);
  }

  async addAcademicYear(
    schoolId: string,
    academicYearId: string,
    session?: ClientSession,
  ): Promise<SchoolResponseDto> {
    const updatedSchool = await this.schoolModel
      .findByIdAndUpdate(
        schoolId,
        { $addToSet: { academicYears: academicYearId } },
        { new: true, session },
      )
      .exec();

    if (!updatedSchool) {
      throw new NotFoundException('School not found');
    }

    return this.mapToResponseDto(updatedSchool);
  }

  async addClass(
    schoolId: string,
    classId: string,
    session?: ClientSession,
  ): Promise<void> {
    await this.schoolModel
      .findByIdAndUpdate(
        schoolId,
        { $addToSet: { classes: classId } },
        { session },
      )
      .exec();
  }

  async findBySchoolAndLevel(
    schoolId: string,
    niveau: string,
  ): Promise<{ classes: Class[]; school: SchoolResponseDto }> {
    const [school, classes] = await Promise.all([
      this.schoolModel.findById(schoolId).exec(),
      this.schoolModel
        .findById(schoolId)
        .populate({
          path: 'classes',
          match: { level: niveau },
          populate: ['school', 'educator'],
        })
        .then((s) => s?.classes || []),
    ]);

    if (!school) {
      throw new Error('School not found');
    }

    return {
      school: this.mapToResponseDto(school),
      classes: classes as unknown as Class[],
    };
  }

  /**
   * Ajoute un enseignant à l'école s'il n'est pas déjà présent
   */
  async addTeacherIfNotExists(
    schoolId: string,
    teacherId: string,
  ): Promise<void> {
    if (
      !Types.ObjectId.isValid(schoolId) ||
      !Types.ObjectId.isValid(teacherId)
    ) {
      throw new NotFoundException('School or Teacher not found');
    }
    await this.schoolModel.findByIdAndUpdate(
      schoolId,
      { $addToSet: { teachers: teacherId } },
      { new: true },
    );
  }

  private mapToResponseDto(school: School): SchoolResponseDto {
    return {
      id: school._id.toString(),
      email: school.email,
      nom: school.nom,
      localite: school.localite,
      directeur: school.directeur,
      address: school.address,
      phone: school.phone,
      academicYear: school.academicYear,
      educationLevel: school.educationLevel,
      location: school.location,
      dateCreation: school.dateCreation,
      niveaux: school.niveaux,
      statut: school.statut,
      matricule: school.matricule,
      nbPersonnel: school['nbPersonnel'], // Access virtual property
      services: school.services,
      frais: school.frais,
      createdAt: school.createdAt!,
      updatedAt: school.updatedAt!,
    };
  }
}
