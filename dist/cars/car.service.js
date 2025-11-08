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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const car_repository_1 = require("./car.repository");
let CarService = class CarService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getCars(filter) {
        return this.repository.findAll(filter);
    }
    async createCar(body) {
        return this.repository.create(body);
    }
    async updateCar(data) {
        if (!data.id || !this.isValidObjectId(data.id)) {
            throw new common_1.BadRequestException('ID invalide');
        }
        const objectId = new mongoose_1.Types.ObjectId(data.id);
        if (!(await this.repository.exists(objectId))) {
            throw new common_1.NotFoundException('Voiture non trouvée');
        }
        const updatedCar = await this.repository.updateById(objectId, data);
        if (!updatedCar) {
            throw new common_1.NotFoundException('Voiture non trouvée après mise à jour');
        }
        return updatedCar;
    }
    async deleteCar(id) {
        if (!this.isValidObjectId(id)) {
            throw new common_1.BadRequestException('ID invalide');
        }
        const objectId = new mongoose_1.Types.ObjectId(id);
        if (!(await this.repository.exists(objectId))) {
            throw new common_1.NotFoundException('Voiture non trouvée');
        }
        return this.repository.deleteById(objectId);
    }
    isValidObjectId(id) {
        return mongoose_1.Types.ObjectId.isValid(id);
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [car_repository_1.CarRepository])
], CarService);
//# sourceMappingURL=car.service.js.map