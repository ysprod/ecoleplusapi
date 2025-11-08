import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Query, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { CarService } from './car.service'; // Importez la classe concrète
import { CarDto } from './dtos/car.dto';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilterDto } from './dtos/car-filter.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {} // Injectez la classe concrète

  @Get()
  async getCars(@Query() filter: CarFilterDto): Promise<{ success: boolean; data: CarDto[] }> {
    const cars = await this.carService.getCars(filter);
    return { success: true, data: cars };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCar(@Body() body: CreateCarDto): Promise<{ success: boolean; data: CarDto }> {
    const car = await this.carService.createCar(body);
    return { success: true, data: car };
  }

  @Put(':id')
  async updateCar(
    @Param('id') id: string,
    @Body() body: UpdateCarDto
  ): Promise<{ success: boolean; data: CarDto }> {
    const updatedCar = await this.carService.updateCar({ ...body, id });
    return { success: true, data: updatedCar };
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<{ success: boolean; data: string }> {
    await this.carService.deleteCar(id);
    return { success: true, data: id };
  }
}