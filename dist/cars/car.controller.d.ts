import { CarService } from './car.service';
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilterDto } from './dtos/car-filter.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    getCars(filter: CarFilterDto): Promise<{
        success: boolean;
        data: CarDto[];
    }>;
    createCar(body: CreateCarDto): Promise<{
        success: boolean;
        data: CarDto;
    }>;
    updateCar(id: string, body: UpdateCarDto): Promise<{
        success: boolean;
        data: CarDto;
    }>;
    deleteCar(id: string): Promise<{
        success: boolean;
        data: string;
    }>;
}
