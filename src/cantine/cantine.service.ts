import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CantineRepository } from './cantine.repository';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';
import { SchoolService } from '../school/school.service';

@Injectable()
export class CantineService {
  constructor(
    private readonly repository: CantineRepository,
    private readonly schoolService: SchoolService,
  ) {}

  async getMenusBySchoolId(schoolId: string) {
    if (!Types.ObjectId.isValid(schoolId))
      throw new NotFoundException('Invalid schoolId');
    const mesmenus = await this.repository.getMenusBySchool(
      new Types.ObjectId(schoolId),
    );
    return mesmenus;
  }

  async createMenu(data: CantineCreateDto) {
    if (!Types.ObjectId.isValid(data.school)) {
      console.error('Invalid school ID provided:', data.school);
      throw new NotFoundException('Invalid school');
    }

    // Vérifier que l'école existe
    try {
      const school = await this.schoolService.findById(data.school.toString());
    } catch (error) {
      console.error('School not found:', error.message);
      throw new NotFoundException('Invalid school - school does not exist');
    }

    return this.repository.createMenu(data);
  }

  async updateMenu(data: CantineUpdateDto) {
    if (!Types.ObjectId.isValid(data.id))
      throw new NotFoundException('Invalid id');
    const updated = await this.repository.updateMenu(
      new Types.ObjectId(data.id),
      data,
    );
    if (!updated) throw new NotFoundException('Menu non trouvé');
    return updated;
  }

  async deleteMenu(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid id');
    const deleted = await this.repository.deleteMenu(new Types.ObjectId(id));
    if (!deleted) throw new NotFoundException('Menu non trouvé');
    return deleted;
  }
}
