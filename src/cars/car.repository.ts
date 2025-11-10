import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CarFilterDto } from './dtos/car-filter.dto';
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { Car } from './schemas/car.schema';
import { ICarRepository } from './car-repository.interface';

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}

  async findAll(filter: CarFilterDto): Promise<CarDto[]> {
    const query: any = {};

    if (filter.isActive !== undefined) {
      query.isActive = filter.isActive === 'true';
    }

    if (filter.model) {
      query.carmodel = { $regex: filter.model, $options: 'i' };
    }

    const cars = await this.carModel
      .find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return cars.map((car) => this.toDto(car));
  }

  async create(carData: CreateCarDto): Promise<CarDto> {
    const car = new this.carModel(carData);
    const savedCar = await car.save();
    return this.toDto(savedCar.toObject());
  }

  async updateById(
    id: Types.ObjectId,
    data: UpdateCarDto,
  ): Promise<CarDto | null> {
    const updatedCar = await this.carModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();

    return updatedCar ? this.toDto(updatedCar) : null;
  }

  async deleteById(id: Types.ObjectId): Promise<boolean> {
    const result = await this.carModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async exists(id: Types.ObjectId): Promise<boolean> {
    const count = await this.carModel.countDocuments({ _id: id }).exec();
    return count > 0;
  }

  private toDto(car: any): CarDto {
    return {
      _id: car._id,
      matricule: car.matricule,
      carmodel: car.carmodel,
      year: car.year,
      capacity: car.capacity,
      driverName: car.driverName,
      isActive: car.isActive,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
      age: car.age,
    };
  }
}
