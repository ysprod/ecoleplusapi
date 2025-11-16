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
    return [
      'Mathématiques', 'Physique', 'Chimie', 'SVT', 'Informatique', 'Technologie',
      'Histoire', 'Géographie', 'Éducation Civique', 'Philosophie',
      'Français', 'Anglais', 'Espagnol',
      'EPS', 'Arts Plastiques', 'Musique',
      'Économie', 'Comptabilité'
    ];
  }

  /**
   * Construit un set par défaut en fonction des cycles (Primaire/Collège/Lycée)
   */
  private buildTemplatesByCycles(cycles?: string[]) {
    const norm = (s: string) => s?.trim().toLowerCase();
    const has = (val: string) => !!cycles?.map(norm).includes(norm(val));

    // Blocs de matières par cycle
    const primaire = [
      { name: 'Mathématiques', code: 'MATH', category: 'SCIENCES', coefficient: 4, color: '#3B82F6' },
      { name: 'Français', code: 'FR', category: 'LANGUAGES', coefficient: 4, color: '#EF4444' },
      { name: 'Anglais', code: 'ENG', category: 'LANGUAGES', coefficient: 2, color: '#8B5CF6' },
      { name: 'SVT', code: 'SVT', category: 'SCIENCES', coefficient: 2, color: '#22C55E' },
      { name: 'Histoire', code: 'HIST', category: 'HUMANITIES', coefficient: 1, color: '#F59E0B' },
      { name: 'Géographie', code: 'GEO', category: 'HUMANITIES', coefficient: 1, color: '#10B981' },
      { name: 'Éducation Civique', code: 'EC', category: 'HUMANITIES', coefficient: 1, color: '#84CC16' },
      { name: 'EPS', code: 'EPS', category: 'PHYSICAL', coefficient: 1, color: '#22D3EE' },
      { name: 'Arts Plastiques', code: 'ARTS', category: 'ARTS', coefficient: 1, color: '#EAB308' },
      { name: 'Musique', code: 'MUS', category: 'ARTS', coefficient: 1, color: '#D946EF' },
      { name: 'Informatique', code: 'INFO', category: 'TECHNICAL', coefficient: 1, color: '#0EA5E9' },
    ];

    const college = [
      { name: 'Mathématiques', code: 'MATH', category: 'SCIENCES', coefficient: 4, color: '#3B82F6' },
      { name: 'Physique', code: 'PHY', category: 'SCIENCES', coefficient: 3, color: '#6366F1' },
      { name: 'Chimie', code: 'CHIM', category: 'SCIENCES', coefficient: 3, color: '#EC4899' },
      { name: 'SVT', code: 'SVT', category: 'SCIENCES', coefficient: 3, color: '#22C55E' },
      { name: 'Français', code: 'FR', category: 'LANGUAGES', coefficient: 4, color: '#EF4444' },
      { name: 'Anglais', code: 'ENG', category: 'LANGUAGES', coefficient: 3, color: '#8B5CF6' },
      { name: 'Espagnol', code: 'ESP', category: 'LANGUAGES', coefficient: 2, color: '#F97316' },
      { name: 'Histoire', code: 'HIST', category: 'HUMANITIES', coefficient: 2, color: '#F59E0B' },
      { name: 'Géographie', code: 'GEO', category: 'HUMANITIES', coefficient: 2, color: '#10B981' },
      { name: 'Éducation Civique', code: 'EC', category: 'HUMANITIES', coefficient: 1, color: '#84CC16' },
      { name: 'EPS', code: 'EPS', category: 'PHYSICAL', coefficient: 2, color: '#22D3EE' },
      { name: 'Arts Plastiques', code: 'ARTS', category: 'ARTS', coefficient: 1, color: '#EAB308' },
      { name: 'Informatique', code: 'INFO', category: 'TECHNICAL', coefficient: 2, color: '#0EA5E9' },
      { name: 'Technologie', code: 'TECH', category: 'TECHNICAL', coefficient: 2, color: '#A78BFA' },
    ];

    const lycee = [
      { name: 'Mathématiques', code: 'MATH', category: 'SCIENCES', coefficient: 5, color: '#3B82F6' },
      { name: 'Physique', code: 'PHY', category: 'SCIENCES', coefficient: 4, color: '#6366F1' },
      { name: 'Chimie', code: 'CHIM', category: 'SCIENCES', coefficient: 4, color: '#EC4899' },
      { name: 'SVT', code: 'SVT', category: 'SCIENCES', coefficient: 3, color: '#22C55E' },
      { name: 'Français', code: 'FR', category: 'LANGUAGES', coefficient: 4, color: '#EF4444' },
      { name: 'Anglais', code: 'ENG', category: 'LANGUAGES', coefficient: 3, color: '#8B5CF6' },
      { name: 'Espagnol', code: 'ESP', category: 'LANGUAGES', coefficient: 2, color: '#F97316' },
      { name: 'Histoire', code: 'HIST', category: 'HUMANITIES', coefficient: 2, color: '#F59E0B' },
      { name: 'Géographie', code: 'GEO', category: 'HUMANITIES', coefficient: 2, color: '#10B981' },
      { name: 'Philosophie', code: 'PHILO', category: 'HUMANITIES', coefficient: 3, color: '#14B8A6' },
      { name: 'Économie', code: 'ECO', category: 'HUMANITIES', coefficient: 2, color: '#06B6D4' },
      { name: 'EPS', code: 'EPS', category: 'PHYSICAL', coefficient: 2, color: '#22D3EE' },
      { name: 'Informatique', code: 'INFO', category: 'TECHNICAL', coefficient: 2, color: '#0EA5E9' },
      { name: 'Technologie', code: 'TECH', category: 'TECHNICAL', coefficient: 2, color: '#A78BFA' },
      { name: 'Comptabilité', code: 'COMPTA', category: 'TECHNICAL', coefficient: 2, color: '#84CC16' },
    ];

    // Si aucun cycle fourni, on garde un set "généraliste"
    if (!cycles || cycles.length === 0) {
      return [
        ...college,
        // ajouter quelques spécifiques lycée qui manquent parfois
        { name: 'Philosophie', code: 'PHILO', category: 'HUMANITIES', coefficient: 2, color: '#14B8A6' },
        { name: 'Économie', code: 'ECO', category: 'HUMANITIES', coefficient: 2, color: '#06B6D4' },
        { name: 'Comptabilité', code: 'COMPTA', category: 'TECHNICAL', coefficient: 2, color: '#84CC16' },
      ];
    }

    // Union des sets selon les cycles
    const bag = new Map<string, any>();
    const addAll = (arr: any[]) => arr.forEach((s) => bag.set(s.code, s));
    if (has('primaire')) addAll(primaire);
    if (has('collège') || has('college')) addAll(college);
    if (has('lycée') || has('lycee')) addAll(lycee);
    return Array.from(bag.values());
  }

  /**
   * Crée en masse un jeu de matières par défaut pour une école + année académique.
   * Évite les doublons en vérifiant les codes existants (composite unique index school+academicYear+code).
   */
  async bulkCreateDefaultForSchool(
    schoolId: string,
    academicYearId: string,
    createdBy?: string,
    options?: {
      cycles?: string[]; // ['Primaire','Collège','Lycée']
      overrides?: Record<string, Partial<{ coefficient: number; color: string }>>; // key = code
    },
  ): Promise<Subject[]> {
    const defaults: Array<{
      name: string;
      code: string;
      category: string;
      coefficient: number;
      color?: string;
    }> = this.buildTemplatesByCycles(options?.cycles);

    // Appliquer éventuels overrides { code: { coefficient?, color? } }
    if (options?.overrides) {
      for (const s of defaults) {
        const o = options.overrides[s.code];
        if (o?.coefficient != null) s.coefficient = o.coefficient;
        if (o?.color) s.color = o.color;
      }
    }

    // Récupérer les codes déjà existants pour éviter doublons
    const existing = await this.subjectModel
      .find({ school: schoolId, academicYear: academicYearId })
      .select('code')
      .lean();
    const existingCodes = new Set(existing.map((s) => s.code));

    const created: Subject[] = [];
    for (const def of defaults) {
      if (existingCodes.has(def.code)) continue; // Skip duplicate
      try {
        const dto: CreateSubjectDto = {
          name: def.name,
          code: def.code,
          category: def.category as any,
          coefficient: def.coefficient,
          school: schoolId,
          academicYear: academicYearId,
          color: def.color,
        };
        const subject = await this.create(dto);
        // Attacher créateur si fourni
        if (createdBy) {
          await this.subjectModel.findByIdAndUpdate(subject._id, {
            $set: { createdBy },
          });
        }
        created.push(subject);
      } catch (e) {
        // En cas de race condition sur l'unicité, on ignore simplement
        if (e instanceof ConflictException) continue;
        console.warn('Échec création matière par défaut', def.code, e.message);
      }
    }
    return created;
  }
}
