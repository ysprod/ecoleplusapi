import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CarRepository } from './car.repository';
import { CarFilterDto } from './dtos/car-filter.dto';
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
 
@Injectable()
export class CarService {
  constructor(private readonly repository: CarRepository) {} // Injectez la classe concrète

  async getCars(filter: CarFilterDto): Promise<CarDto[]> {
    return this.repository.findAll(filter);
  }

  async createCar(body: CreateCarDto): Promise<CarDto> {
    return this.repository.create(body);
  }

  async updateCar(data: UpdateCarDto): Promise<CarDto> {
    if (!data.id || !this.isValidObjectId(data.id)) {
      throw new BadRequestException('ID invalide');
    }

    const objectId = new Types.ObjectId(data.id);
    
    if (!(await this.repository.exists(objectId))) {
      throw new NotFoundException('Voiture non trouvée');
    }

    const updatedCar = await this.repository.updateById(objectId, data);
    
    if (!updatedCar) {
      throw new NotFoundException('Voiture non trouvée après mise à jour');
    }

    return updatedCar;
  }

  async deleteCar(id: string): Promise<boolean> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException('ID invalide');
    }

    const objectId = new Types.ObjectId(id);
    
    if (!(await this.repository.exists(objectId))) {
      throw new NotFoundException('Voiture non trouvée');
    }

    return this.repository.deleteById(objectId);
  }

  private isValidObjectId(id: string): boolean {
    return Types.ObjectId.isValid(id);
  }
}