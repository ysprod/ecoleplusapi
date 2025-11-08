import { Model, Types } from 'mongoose';
import { CarFilterDto } from './dtos/car-filter.dto';
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { Car } from './schemas/car.schema';
import { ICarRepository } from './car-repository.interface';
export declare class CarRepository implements ICarRepository {
    private readonly carModel;
    constructor(carModel: Model<Car>);
    findAll(filter: CarFilterDto): Promise<CarDto[]>;
    create(carData: CreateCarDto): Promise<CarDto>;
    updateById(id: Types.ObjectId, data: UpdateCarDto): Promise<CarDto | null>;
    deleteById(id: Types.ObjectId): Promise<boolean>;
    exists(id: Types.ObjectId): Promise<boolean>;
    private toDto;
}
