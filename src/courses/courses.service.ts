import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CourseSession, CourseSessionDocument } from './schemas/course-session.schema';
import { CourseEnrollment, CourseEnrollmentDocument } from './schemas/course-enrollment.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseSessionDto } from './dto/create-course-session.dto';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(CourseSession.name)
    private sessionModel: Model<CourseSessionDocument>,
    @InjectModel(CourseEnrollment.name)
    private enrollmentModel: Model<CourseEnrollmentDocument>,
  ) {}

  async createCourse(dto: CreateCourseDto) {
    try {
      const created = await this.courseModel.create({
        ...dto,
        school: new Types.ObjectId(dto.school),
        academicYear: new Types.ObjectId(dto.academicYear),
        class: new Types.ObjectId(dto.class),
        subject: new Types.ObjectId(dto.subject),
        mainTeacher: new Types.ObjectId(dto.mainTeacher),
        coTeachers: (dto.coTeachers || []).map((id) => new Types.ObjectId(id)),
      });
      return created;
    } catch (e: any) {
      if (e?.code === 11000) {
        throw new ConflictException('Course already exists for class/subject/year');
      }
      throw e;
    }
  }

  async findCourses(filter: Partial<{ school: string; academicYear: string; class: string; subject: string; teacher: string }>) {
    const query: any = {};
    if (filter.school) query.school = new Types.ObjectId(filter.school);
    if (filter.academicYear) query.academicYear = new Types.ObjectId(filter.academicYear);
    if (filter.class) query.class = new Types.ObjectId(filter.class);
    if (filter.subject) query.subject = new Types.ObjectId(filter.subject);
    if (filter.teacher) query.mainTeacher = new Types.ObjectId(filter.teacher);
    return this.courseModel.find(query).lean().exec();
  }

  async findCourseById(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async updateCourse(id: string, dto: UpdateCourseDto) {
    const updated = await this.courseModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Course not found');
    return updated;
  }

  async deleteCourse(id: string) {
    const res = await this.courseModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Course not found');
    await this.sessionModel.deleteMany({ course: new Types.ObjectId(id) });
    await this.enrollmentModel.deleteMany({ course: new Types.ObjectId(id) });
    return { deleted: true };
  }

  async createSession(dto: CreateCourseSessionDto) {
    const course = await this.courseModel.findById(dto.course).lean();
    if (!course) throw new NotFoundException('Course not found');
    const created = await this.sessionModel.create({
      ...dto,
      course: new Types.ObjectId(dto.course),
      date: new Date(dto.date),
    });
    return created;
  }

  async listSessions(courseId: string) {
    return this.sessionModel
      .find({ course: new Types.ObjectId(courseId) })
      .sort({ date: 1, startTime: 1 })
      .lean()
      .exec();
  }

  async enroll(dto: CreateCourseEnrollmentDto) {
    const courseId = new Types.ObjectId(dto.course);
    const course = await this.courseModel.findById(courseId).lean();
    if (!course) throw new NotFoundException('Course not found');
    const at = dto.enrolledAt ? new Date(dto.enrolledAt) : new Date();
    const ops = dto.studentIds.map((sid) => ({
      updateOne: {
        filter: { course: courseId, student: new Types.ObjectId(sid) },
        update: {
          $setOnInsert: {
            course: courseId,
            student: new Types.ObjectId(sid),
            enrolledAt: at,
            status: 'active',
          },
        },
        upsert: true,
      },
    }));
    await this.enrollmentModel.bulkWrite(ops);
    return this.listEnrollments(dto.course);
  }

  async listEnrollments(courseId: string) {
    return this.enrollmentModel
      .find({ course: new Types.ObjectId(courseId) })
      .lean()
      .exec();
  }
}
