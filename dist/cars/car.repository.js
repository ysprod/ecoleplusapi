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
exports.CarRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const car_schema_1 = require("./schemas/car.schema");
let CarRepository = class CarRepository {
    carModel;
    constructor(carModel) {
        this.carModel = carModel;
    }
    async findAll(filter) {
        const query = {};
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
        return cars.map(car => this.toDto(car));
    }
    async create(carData) {
        const car = new this.carModel(carData);
        const savedCar = await car.save();
        return this.toDto(savedCar.toObject());
    }
    async updateById(id, data) {
        const updatedCar = await this.carModel
            .findByIdAndUpdate(id, data, { new: true })
            .lean()
            .exec();
        return updatedCar ? this.toDto(updatedCar) : null;
    }
    async deleteById(id) {
        const result = await this.carModel.findByIdAndDelete(id).exec();
        return !!result;
    }
    async exists(id) {
        const count = await this.carModel.countDocuments({ _id: id }).exec();
        return count > 0;
    }
    toDto(car) {
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
            age: car.age
        };
    }
};
exports.CarRepository = CarRepository;
exports.CarRepository = CarRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(car_schema_1.Car.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CarRepository);
//# sourceMappingURL=car.repository.js.map