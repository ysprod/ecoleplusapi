import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cantine } from './schemas/cantine.schema';
import { CantineCreateDto } from './dtos/CantineCreate.dto';
import { CantineUpdateDto } from './dtos/CantineUpdateDto';
 

@Injectable()
export class CantineRepository {
  constructor(@InjectModel(Cantine.name) private cantineModel: Model<Cantine>) {}

  async getMenusBySchool(schoolId: Types.ObjectId) {
    
    
    
    // Chercher avec l'ObjectId ET avec la version string
    const schoolIdString = schoolId.toString();
    
    const query = {
      $or: [
        { school: schoolId },
        { school: schoolIdString }
      ]
    };
    
    const sortedMenus = await this.cantineModel.find(query).sort({ createdAt: -1, date: 1 });
    
    return sortedMenus;
  }

  async createMenu(menuData: CantineCreateDto) {
    const menu = new this.cantineModel(menuData);
    return menu.save();
  }

  async updateMenu(id: Types.ObjectId, updateData: CantineUpdateDto) {
    return this.cantineModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteMenu(id: Types.ObjectId) {
    const result = await this.cantineModel.findByIdAndDelete(id);
    return result !== null;
  }
}
