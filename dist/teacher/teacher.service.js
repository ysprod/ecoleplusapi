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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const teacher_schema_1 = require("./schemas/teacher.schema");
const school_service_1 = require("../school/school.service");
const class_service_1 = require("../class/class.service");
const user_service_1 = require("../user/user.service");
let TeacherService = class TeacherService {
    teacherModel;
    schoolService;
    classService;
    userService;
    constructor(teacherModel, schoolService, classService, userService) {
        this.teacherModel = teacherModel;
        this.schoolService = schoolService;
        this.classService = classService;
        this.userService = userService;
    }
    mapToResponseDto(teacher) {
        return {
            id: teacher._id.toString(),
            user: teacher.user,
            matricule: teacher.matricule,
            lastName: teacher.lastName,
            firstName: teacher.firstName,
            fullName: `${teacher.firstName} ${teacher.lastName}`.trim(),
            email: teacher.email,
            gender: teacher.gender,
            phone: teacher.phone,
            birthDate: teacher.birthDate,
            subjects: teacher.subjects,
            classes: teacher.classes,
            schools: teacher.schools,
            grades: teacher.grades,
            createdAt: teacher.createdAt,
            updatedAt: teacher.updatedAt,
        };
    }
    async create(createTeacherDto) {
        const existingTeacher = await this.teacherModel.findOne({
            matricule: createTeacherDto.matricule,
        });
        if (existingTeacher) {
            throw new common_1.ConflictException('Teacher with this matricule already exists');
        }
        const user = await this.userService.create({
            email: createTeacherDto.email || `${createTeacherDto.matricule}@school.com`,
            firstName: createTeacherDto.firstName,
            lastName: createTeacherDto.lastName,
            role: 'teacher',
            profileType: 'teacher',
            password: createTeacherDto.password || createTeacherDto.matricule || 'changeme123',
        });
        const createdTeacher = new this.teacherModel({
            ...createTeacherDto,
            user: user.id,
        });
        const savedTeacher = await createdTeacher.save();
        return this.mapToResponseDto(savedTeacher);
    }
    async findAll() {
        const teachers = await this.teacherModel
            .find()
            .populate('user classes schools grades')
            .exec();
        return teachers.map(teacher => this.mapToResponseDto(teacher));
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const teacher = await this.teacherModel
            .findById(id)
            .populate('user classes schools grades')
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.mapToResponseDto(teacher);
    }
    async findByMatricule(matricule) {
        const teacher = await this.teacherModel
            .findOne({ matricule })
            .populate('user classes schools grades')
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.mapToResponseDto(teacher);
    }
    async findByUserId(userId) {
        if (!userId || !mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const teacher = await this.teacherModel
            .findOne({ user: userId })
            .populate('user schools grades')
            .populate({
            path: 'classes',
            populate: { path: 'school' }
        })
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.mapToResponseDto(teacher);
    }
    async update(id, updateTeacherDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const updatedTeacher = await this.teacherModel
            .findByIdAndUpdate(id, updateTeacherDto, { new: true })
            .populate('user classes schools grades')
            .exec();
        if (!updatedTeacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.mapToResponseDto(updatedTeacher);
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const teacher = await this.teacherModel.findById(id).exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        await this.userService.remove(teacher.user.toString());
        await this.teacherModel.findByIdAndDelete(id).exec();
    }
    async assignToClass(assignmentDto) {
        const { teacherId, classId, schoolId } = assignmentDto;
        const teacher = await this.teacherModel.findById(teacherId);
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        await this.classService.addTeacherToClass(classId, teacherId);
        await this.teacherModel.findByIdAndUpdate(teacherId, {
            $addToSet: { classes: classId, schools: schoolId },
        });
        await this.schoolService.addTeacherIfNotExists(schoolId, teacherId);
        return this.findById(teacherId);
    }
    async updateSubjects(teacherId, subjects) {
        if (!mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        const updatedTeacher = await this.teacherModel
            .findByIdAndUpdate(teacherId, { subjects }, { new: true })
            .populate('user classes schools grades')
            .exec();
        if (!updatedTeacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return this.mapToResponseDto(updatedTeacher);
    }
    async getTeachersBySchool(schoolId, page = 1, limit = 20) {
        if (!mongoose_2.Types.ObjectId.isValid(schoolId)) {
            throw new common_1.NotFoundException('School not found');
        }
        const skip = (page - 1) * limit;
        const [teachers, total] = await Promise.all([
            this.teacherModel
                .find({ schools: schoolId })
                .skip(skip)
                .limit(limit)
                .sort({ lastName: 1, firstName: 1 })
                .populate('user classes schools grades')
                .exec(),
            this.teacherModel.countDocuments({ schools: schoolId }),
        ]);
        return {
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            teachers: teachers.map(teacher => this.mapToResponseDto(teacher)),
        };
    }
    async getTeacherProfile(userId) {
        const teacher = await this.teacherModel
            .findOne({ user: userId })
            .populate({
            path: 'user',
            select: '-password',
        })
            .populate({
            path: 'classes',
            populate: [
                { path: 'school' },
                { path: 'students' },
                { path: 'educator' },
                { path: 'teachers' },
            ],
        })
            .populate('schools grades')
            .exec();
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher profile not found');
        }
        return this.mapToResponseDto(teacher);
    }
    async getEducatorsByUserIds(userIds) {
        if (!userIds || userIds.length === 0)
            return [];
        const teachers = await this.teacherModel
            .find({ user: { $in: userIds } })
            .populate('user classes schools grades')
            .exec();
        return teachers.map(teacher => this.mapToResponseDto(teacher));
    }
    async assignTeacherToClass(data) {
        let teacher = await this.teacherModel.findOne({ matricule: data.matricule });
        if (!teacher) {
            throw new common_1.NotFoundException('Enseignant non trouvé');
        }
        await this.classService.addTeacherToClass(data.classId, teacher._id.toString());
        await this.schoolService.addTeacherIfNotExists(data.schoolId, teacher._id.toString());
        await this.teacherModel.findByIdAndUpdate(teacher._id, {
            $addToSet: { classes: data.classId, schools: data.schoolId },
        });
        return this.classService.getTeacherClasses(teacher._id.toString(), data.schoolId);
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(teacher_schema_1.Teacher.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => school_service_1.SchoolService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => class_service_1.ClassService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        school_service_1.SchoolService,
        class_service_1.ClassService,
        user_service_1.UserService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map