import { CarFilterDto } from "./dtos/car-filter.dto";
import { CarDto } from "./dtos/car.dto";
import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car.dto";
export interface ICarService {
    getCars(filter: CarFilterDto): Promise<CarDto[]>;
    createCar(body: CreateCarDto): Promise<CarDto>;
    updateCar(data: UpdateCarDto): Promise<CarDto>;
    deleteCar(id: string): Promise<boolean>;
}
