import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './schemas/course.schema';
import { CourseSession, CourseSessionSchema } from './schemas/course-session.schema';
import { CourseEnrollment, CourseEnrollmentSchema } from './schemas/course-enrollment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseSession.name, schema: CourseSessionSchema },
      { name: CourseEnrollment.name, schema: CourseEnrollmentSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
