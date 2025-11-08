"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const user_schema_1 = require("./schemas/user.schema");
const teacher_service_1 = require("../teacher/teacher.service");
const teacher_schema_1 = require("../teacher/schemas/teacher.schema");
let UserService = class UserService {
    teacherModel;
    userModel;
    teacherService;
    constructor(teacherModel, userModel, teacherService) {
        this.teacherModel = teacherModel;
        this.userModel = userModel;
        this.teacherService = teacherService;
    }
    mapToResponseDto(user) {
        const userDoc = user;
        return {
            id: userDoc._id.toString(),
            email: userDoc.email,
            matricule: userDoc.matricule,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            name: `${userDoc.firstName} ${userDoc.lastName}`.trim(),
            gender: userDoc.gender,
            role: userDoc.role,
            profileType: userDoc.profileType,
            emailVerified: userDoc.emailVerified,
            phone: userDoc.phone,
            status: userDoc.status,
            birthDate: userDoc.birthDate,
            photo: userDoc.photo,
            avatar: userDoc.avatar,
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt,
        };
    }
    async findByPhone(phone) {
        const user = await this.userModel.findOne({ phone }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async create(createUserDto) {
        const email = createUserDto.email.toLowerCase();
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
            ...createUserDto,
            email,
            password: hashedPassword,
        });
        const savedUser = await createdUser.save();
        const usersaved = this.mapToResponseDto(savedUser);
        if (usersaved.profileType === 'staff') {
            try {
                const createTeacherDto = {
                    matricule: usersaved.matricule || '',
                    firstName: usersaved.firstName,
                    lastName: usersaved.lastName,
                    email: usersaved.email,
                    gender: usersaved.gender,
                    phone: usersaved.phone,
                    birthDate: usersaved.birthDate,
                };
                const createdTeacher = new this.teacherModel({ ...usersaved,
                    ...createTeacherDto,
                    user: usersaved.id,
                });
                const savedTeacher = await createdTeacher.save();
            }
            catch (error) {
                console.error('Failed to create teacher record for staff user:', error);
            }
        }
        return usersaved;
    }
    async findAll() {
        const users = await this.userModel.find().exec();
        return users.map(user => this.mapToResponseDto(user));
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async findByEmail(email) {
        const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async findByMatricule(matricule) {
        const user = await this.userModel.findOne({ matricule }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async update(id, updateUserDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('User not found');
        }
    }
    async demoteToUser(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.userModel
            .findByIdAndUpdate(id, { role: 'user' }, { new: true })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.mapToResponseDto(user);
    }
    async findRawByEmail(email) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user._id.toString(),
            email: user.email,
            matricule: user.matricule,
            firstName: user.firstName,
            lastName: user.lastName,
            name: `${user.firstName} ${user.lastName}`.trim(),
            gender: user.gender,
            role: user.role,
            profileType: user.profileType,
            emailVerified: user.emailVerified,
            phone: user.phone,
            status: user.status,
            birthDate: user.birthDate,
            photo: user.photo,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async getUserById(userId, fields = ['email', 'firstName', 'lastName', 'role']) {
        if (!userId || !mongoose_2.Types.ObjectId.isValid(userId.toString())) {
            throw new common_1.NotFoundException('User not found');
        }
        const projection = fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {});
        const user = await this.userModel.findById(userId, projection).lean().exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => teacher_service_1.TeacherService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        teacher_service_1.TeacherService])
], UserService);
//# sourceMappingURL=user.service.js.map