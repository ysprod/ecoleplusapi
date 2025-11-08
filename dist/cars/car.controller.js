"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("./car.service");
const create_car_dto_1 = require("./dtos/create-car.dto");
const update_car_dto_1 = require("./dtos/update-car.dto");
const car_filter_dto_1 = require("./dtos/car-filter.dto");
let CarController = class CarController {
    carService;
    constructor(carService) {
        this.carService = carService;
    }
    async getCars(filter) {
        const cars = await this.carService.getCars(filter);
        return { success: true, data: cars };
    }
    async createCar(body) {
        const car = await this.carService.createCar(body);
        return { success: true, data: car };
    }
    async updateCar(id, body) {
        const updatedCar = await this.carService.updateCar({ ...body, id });
        return { success: true, data: updatedCar };
    }
    async deleteCar(id) {
        await this.carService.deleteCar(id);
        return { success: true, data: id };
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_filter_dto_1.CarFilterDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCars", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "updateCar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "deleteCar", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map