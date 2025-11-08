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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const school_service_1 = require("../school/school.service");
const class_schema_1 = require("./schemas/class.schema");
const student_schema_1 = require("../students/schemas/student.schema");
const validation_service_1 = require("../shared/validation.service");
let ClassService = class ClassService {
    classModel;
    schoolService;
    studentModel;
    constructor(classModel, schoolService, studentModel) {
        this.classModel = classModel;
        this.schoolService = schoolService;
        this.studentModel = studentModel;
    }
    async getAcademicClasses2(schoolId, classType, niveau) {
        const filter = { school: schoolId };
        if (classType)
            filter.classType = classType;
        if (niveau)
            filter.level = niveau;
        const classes = await this.classModel.find(filter).populate('school').exec();
        return classes;
    }
    async getSchoolForClass(classId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId))
            return null;
        const classDoc = await this.classModel.findById(classId).populate('school').exec();
        if (!classDoc || !classDoc.school)
            return null;
        return classDoc.school;
    }
    async getStudentsForClass(classId) {
        const classDoc = await this.classModel.findById(classId).exec();
        if (!classDoc) {
            return [];
        }
        if (classDoc.students && classDoc.students.length > 0) {
            const studentsFromIds = await this.studentModel.find({
                _id: { $in: classDoc.students }
            }).exec();
            const studentsWithClassRef = await this.studentModel.find({
                $or: [
                    { class: new mongoose_2.Types.ObjectId(classId) },
                    { class: classId }
                ]
            }).exec();
        }
        const classDocPopulated = await this.classModel
            .findById(classId)
            .populate({ path: 'students', model: 'Student' })
            .exec();
        if (!classDocPopulated || !classDocPopulated.students) {
            return [];
        }
        const students = classDocPopulated.students;
        return students;
    }
    async getTeachersForClass(classId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId)) {
            throw new common_1.NotFoundException('Invalid class ID');
        }
        const classDoc = await this.classModel
            .findById(classId)
            .populate({
            path: 'teachers',
            model: 'Teacher',
            populate: [
                { path: 'subjects', model: 'Subject' },
                { path: 'schools', model: 'School' }
            ]
        })
            .exec();
        if (!classDoc) {
            throw new common_1.NotFoundException('Class not found');
        }
        if (!classDoc.teachers || classDoc.teachers.length === 0) {
            return [];
        }
        const teachers = classDoc.teachers;
        return teachers;
    }
    async getAcademicClasses(schoolId, classType, niveau) {
        if (!schoolId)
            return [];
        const query = { school: schoolId };
        if (classType)
            query.classType = classType;
        if (niveau)
            query.niveau = niveau;
        const classes = await this.classModel.find(query).lean();
        return classes || [];
    }
    mapToResponseDto(classDoc) {
        return {
            id: classDoc._id.toString(),
            name: classDoc.name,
            level: classDoc.level,
            classType: classDoc.classType,
            school: classDoc.school,
            students: classDoc.students,
            schedules: classDoc.schedules,
            teachers: classDoc.teachers,
            educator: classDoc.educator,
            academicYear: classDoc.academicYear,
            subjects: classDoc.subjects,
            studentCount: classDoc['studentCount'],
            teacherCount: classDoc['teacherCount'],
            fullName: classDoc.getFullName(),
            createdAt: classDoc.createdAt || new Date(),
            updatedAt: classDoc.updatedAt || new Date(),
        };
    }
    async getSchoolStudents(schoolId, options) {
        if (!schoolId || !mongoose_2.Types.ObjectId.isValid(schoolId)) {
            return {
                students: [],
                pagination: { page: 1, limit: 10, total: 0, pages: 0 },
            };
        }
        const page = options?.page || 1;
        const limit = options?.limit || 10;
        const query = { school: schoolId };
        const studentsRaw = await this.studentModel
            .find(query)
            .populate({ path: 'class', model: 'Class' })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        let students = studentsRaw;
        if (options?.niveau) {
            students = studentsRaw.filter(s => s.class && s.class.level === options.niveau);
        }
        let total = await this.studentModel.countDocuments(query);
        if (options?.niveau) {
            total = studentsRaw.filter(s => s.class && s.class.level === options.niveau).length;
        }
        return {
            students,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async find(params) {
        const filter = {};
        if (params?.schoolId) {
            filter.school = params.schoolId;
        }
        if (params?.niveau) {
            filter.level = params.niveau;
        }
        const classes = await this.classModel
            .find(filter)
            .populate('school')
            .exec();
        return classes.map(cls => this.mapToResponseDto(cls));
    }
    async create(createClassDto) {
        const existingClass = await this.classModel.findOne({
            name: createClassDto.name,
            school: createClassDto.schoolId,
        });
        if (existingClass) {
            throw new common_1.ConflictException('Class with this name already exists in this school');
        }
        const fees = {};
        if (createClassDto.tuitionFee !== undefined) {
            fees['tuition'] = { amount: createClassDto.tuitionFee, currency: 'FCFA' };
        }
        if (createClassDto.canteenFee !== undefined) {
            fees['canteen'] = { amount: createClassDto.canteenFee, currency: 'FCFA' };
        }
        if (createClassDto.transportFee !== undefined) {
            fees['transport'] = { amount: createClassDto.transportFee, currency: 'FCFA' };
        }
        if (createClassDto.activitiesFee !== undefined) {
            fees['activities'] = { amount: createClassDto.activitiesFee, currency: 'FCFA' };
        }
        const createdClass = new this.classModel({
            ...createClassDto,
            school: createClassDto.schoolId,
            fees,
            createdBy: createClassDto.user,
        });
        const savedClass = await createdClass.save();
        await this.schoolService.addClass(createClassDto.schoolId, savedClass._id.toString());
        return this.mapToResponseDto(savedClass);
    }
    async findAll() {
        const classes = await this.classModel.find().populate('school').exec();
        return classes.map(cls => this.mapToResponseDto(cls));
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Class not found');
        }
        const classDoc = await this.classModel
            .findById(id)
            .populate('school students teachers educator academicYear subjects')
            .exec();
        if (!classDoc) {
            throw new common_1.NotFoundException('Class not found');
        }
        return this.mapToResponseDto(classDoc);
    }
    async findBySchool(schoolId) {
        const classes = await this.classModel
            .find({ school: schoolId })
            .populate('school')
            .exec();
        return classes.map(cls => this.mapToResponseDto(cls));
    }
    async findBySchoolAndLevel(schoolId, level) {
        const classes = await this.classModel
            .find({ school: schoolId, level })
            .populate('school')
            .exec();
        return classes.map(cls => this.mapToResponseDto(cls));
    }
    async update(id, updateClassDto, userId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Class not found');
        }
        const updatedClass = await this.classModel
            .findByIdAndUpdate(id, { ...updateClassDto, updatedBy: userId }, { new: true })
            .populate('school students teachers educator academicYear subjects')
            .exec();
        if (!updatedClass) {
            throw new common_1.NotFoundException('Class not found');
        }
        return this.mapToResponseDto(updatedClass);
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotFoundException('Class not found');
        }
        const result = await this.classModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Class not found');
        }
    }
    async addStudent(classId, studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId) || !mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Class or student not found');
        }
        const updatedClass = await this.classModel
            .findByIdAndUpdate(classId, { $addToSet: { students: studentId } }, { new: true })
            .populate('school students teachers educator academicYear subjects')
            .exec();
        if (!updatedClass) {
            throw new common_1.NotFoundException('Class not found');
        }
        return this.mapToResponseDto(updatedClass);
    }
    async addTeacherToClass(classId, teacherId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId) || !mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.NotFoundException('Class or Teacher not found');
        }
        await this.classModel.findByIdAndUpdate(classId, { $addToSet: { teachers: teacherId } }, { new: true });
    }
    async assignEducator(classId, educatorId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId) || !mongoose_2.Types.ObjectId.isValid(educatorId)) {
            throw new common_1.NotFoundException('Class or educator not found');
        }
        const updatedClass = await this.classModel
            .findByIdAndUpdate(classId, { educator: educatorId }, { new: true })
            .populate('school students teachers educator academicYear subjects')
            .exec();
        if (!updatedClass) {
            throw new common_1.NotFoundException('Class not found');
        }
        return this.mapToResponseDto(updatedClass);
    }
    async getClassStats(schoolId) {
        const matchStage = schoolId ? { $match: { school: new mongoose_2.Types.ObjectId(schoolId) } } : { $match: {} };
        const stats = await this.classModel.aggregate([
            matchStage,
            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,
                                totalClasses: { $sum: 1 },
                                avgStudents: { $avg: { $size: "$students" } },
                                totalStudents: { $sum: { $size: "$students" } },
                                totalTeachers: { $sum: { $size: "$teachers" } },
                            },
                        },
                    ],
                    byLevel: [
                        {
                            $group: {
                                _id: "$level",
                                count: { $sum: 1 },
                                withEducator: {
                                    $sum: { $cond: [{ $ifNull: ["$educator", false] }, 1, 0] },
                                },
                            },
                        },
                    ],
                    byClassType: [
                        {
                            $group: {
                                _id: "$classType",
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    creationTrend: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: { format: "%Y-%m", date: "$createdAt" },
                                },
                                count: { $sum: 1 },
                            },
                        },
                        { $sort: { _id: 1 } },
                    ],
                },
            },
            {
                $project: {
                    summary: { $arrayElemAt: ["$summary", 0] },
                    byLevel: 1,
                    byClassType: 1,
                    creationTrend: 1,
                },
            },
        ]);
        return this.mapStatsResult(stats[0]);
    }
    mapStatsResult(result) {
        return {
            summary: {
                totalClasses: result.summary?.totalClasses || 0,
                avgStudents: result.summary?.avgStudents || 0,
                totalStudents: result.summary?.totalStudents || 0,
                totalTeachers: result.summary?.totalTeachers || 0,
            },
            byLevel: result.byLevel?.map((item) => ({
                level: item._id,
                count: item.count,
                withEducator: item.withEducator,
            })) || [],
            byClassType: result.byClassType?.map((item) => ({
                classType: item._id,
                count: item.count,
            })) || [],
            topSchools: [],
            creationTrend: result.creationTrend?.map((item) => ({
                month: item._id,
                count: item.count,
            })) || [],
        };
    }
    async removeStudent(classId, studentId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId) || !mongoose_2.Types.ObjectId.isValid(studentId)) {
            throw new common_1.NotFoundException('Class or Student not found');
        }
        await this.classModel.findByIdAndUpdate(classId, { $pull: { students: new mongoose_2.Types.ObjectId(studentId) } });
    }
    async addTeacher(classId, teacherId) {
        if (!mongoose_2.Types.ObjectId.isValid(classId) || !mongoose_2.Types.ObjectId.isValid(teacherId)) {
            throw new common_1.NotFoundException('Class or Teacher not found');
        }
        const updatedClass = await this.classModel.findByIdAndUpdate(classId, { $addToSet: { teachers: new mongoose_2.Types.ObjectId(teacherId) } }, { new: true }).populate('teachers');
        if (!updatedClass) {
            throw new common_1.NotFoundException('Class not found');
        }
        return {
            id: updatedClass._id.toString(),
            name: updatedClass.name,
            level: updatedClass.level,
            school: updatedClass.school,
            teachers: updatedClass.teachers,
            students: updatedClass.students,
            createdAt: updatedClass.createdAt,
            updatedAt: updatedClass.updatedAt,
        };
    }
    async getTeacherClasses(teacherId, schoolId) {
        validation_service_1.ValidationService.validateObjectId(teacherId);
        const query = { teachers: teacherId };
        if (schoolId) {
            query.school = schoolId;
        }
        const classes = await this.classModel
            .find(query)
            .select('name level school')
            .populate({
            path: 'school',
            select: '_id name nom',
        })
            .lean()
            .exec();
        return classes.map(cls => ({
            _id: cls._id?.toString(),
            name: cls.name,
            level: cls.level,
            school: cls.school
                ? {
                    _id: cls.school._id?.toString(),
                }
                : undefined,
        }));
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => school_service_1.SchoolService))),
    __param(2, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        school_service_1.SchoolService,
        mongoose_2.Model])
], ClassService);
//# sourceMappingURL=class.service.js.map