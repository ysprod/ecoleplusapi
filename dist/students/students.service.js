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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("./schemas/student.schema");
const class_service_1 = require("../class/class.service");
let StudentsService = class StudentsService {
    studentModel;
    classService;
    constructor(studentModel, classService) {
        this.studentModel = studentModel;
        this.classService = classService;
    }
    async mapToResponseDto(student) {
        await student.populate([
            { path: 'class' },
            { path: 'parents' },
            { path: 'grades' },
            { path: 'payments' },
        ]);
        return {
            id: student._id.toString(),
            firstName: student.firstName,
            lastName: student.lastName,
            fullName: `${student.firstName} ${student.lastName}`,
            birthDate: student.birthDate,
            age: student['age'],
            birthPlace: student.birthPlace,
            email: student.email,
            gender: student.gender,
            bloodGroup: student.bloodGroup,
            parentContact: student.parentContact,
            class: student.class,
            classLevel: student.classLevel,
            photoUrl: student.photoUrl,
            healthNotes: student.healthNotes,
            healthIssues: student.healthIssues,
            forbiddenFoods: student.forbiddenFoods,
            parents: student.parents,
            grades: student.grades,
            payments: student.payments,
            matricule: student.matricule,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
        };
    }
    async create(createStudentDto) {
        const matricule = createStudentDto.matricule || `STU-${Date.now().toString().slice(-6)}`;
        const existingStudent = await this.studentModel.findOne({ matricule });
        if (existingStudent) {
            throw new common_1.ConflictException('Student with this matricule already exists');
        }
        if (createStudentDto.class) {
            await this.classService.findById(createStudentDto.class);
        }
        const createdStudent = new this.studentModel({
            ...createStudentDto,
            matricule,
            class: createStudentDto.class ? new mongoose_2.Types.ObjectId(createStudentDto.class) : undefined,
        });
        const savedStudent = await createdStudent.save();
        if (createStudentDto.class) {
            await this.classService.addStudent(createStudentDto.class, savedStudent._id.toString());
        }
        return this.mapToResponseDto(savedStudent);
    }
    async findAll(query = {}, skip = 0, limit = 20) {
        const students = await this.studentModel.find(query).skip(skip).limit(limit).exec();
        return Promise.all(students.map(student => this.mapToResponseDto(student)));
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Student not found');
        }
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return this.mapToResponseDto(student);
    }
    async findByMatricule(matricule) {
        const student = await this.studentModel.findOne({ matricule }).exec();
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return this.mapToResponseDto(student);
    }
    async update(id, updateStudentDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Student not found');
        }
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        if (updateStudentDto.class && updateStudentDto.class !== student.class?.toString()) {
            if (student.class) {
                await this.classService.removeStudent(student.class.toString(), student._id.toString());
            }
            await this.classService.addStudent(updateStudentDto.class, student._id.toString());
        }
        if (updateStudentDto.matricule) {
            const existingStudent = await this.studentModel.findOne({
                matricule: updateStudentDto.matricule,
                _id: { $ne: new mongoose_2.Types.ObjectId(id) }
            });
            if (existingStudent) {
                throw new common_1.BadRequestException('Un étudiant avec ce matricule existe déjà');
            }
        }
        const updatedStudent = await this.studentModel
            .findByIdAndUpdate(id, updateStudentDto, { new: true })
            .exec();
        if (!updatedStudent) {
            throw new common_1.NotFoundException('Student not found');
        }
        return this.mapToResponseDto(updatedStudent);
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Student not found');
        }
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        if (student.class) {
            await this.classService.removeStudent(student.class.toString(), student._id.toString());
        }
        await this.studentModel.findByIdAndDelete(id).exec();
    }
    async searchStudents(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return [];
        }
        const students = await this.studentModel
            .find({
            $or: [
                { matricule: { $regex: searchTerm.trim(), $options: 'i' } },
                { firstName: { $regex: searchTerm.trim(), $options: 'i' } },
                { lastName: { $regex: searchTerm.trim(), $options: 'i' } },
            ],
        })
            .exec();
        return Promise.all(students.map(student => this.mapToResponseDto(student)));
    }
    async getPaginatedStudents(classId, page = 1, limit = 10) {
        const query = {};
        if (classId) {
            query.class = new mongoose_2.Types.ObjectId(classId);
        }
        const [students, total] = await Promise.all([
            this.studentModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.studentModel.countDocuments(query),
        ]);
        return {
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
            students: await Promise.all(students.map(student => this.mapToResponseDto(student))),
        };
    }
    async addParent(studentId, parentId) {
        if (!mongoose_2.Types.ObjectId.isValid(studentId) || !mongoose_2.Types.ObjectId.isValid(parentId)) {
            throw new common_1.BadRequestException('ID invalide');
        }
        const updatedStudent = await this.studentModel
            .findByIdAndUpdate(studentId, { $addToSet: { parents: new mongoose_2.Types.ObjectId(parentId) } }, { new: true })
            .exec();
        if (!updatedStudent) {
            throw new common_1.NotFoundException('Student not found');
        }
        return this.mapToResponseDto(updatedStudent);
    }
    async count(query = {}) {
        return this.studentModel.countDocuments(query).exec();
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        class_service_1.ClassService])
], StudentsService);
//# sourceMappingURL=students.service.js.map