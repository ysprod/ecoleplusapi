import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsService } from './subjects.service.improved';
import { SubjectsController } from './subjects.controller.improved';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { Teacher, TeacherSchema } from '../teacher/schemas/teacher.schema';
import { Class, ClassSchema } from '../class/schemas/class.schema';
import { School, SchoolSchema } from '../school/schemas/school.schema';
import { AcademicYear, AcademicYearSchema } from '../academicyears/schemas/academic-year.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Class.name, schema: ClassSchema },
      { name: School.name, schema: SchoolSchema },
      { name: AcademicYear.name, schema: AcademicYearSchema }
    ])
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService, MongooseModule]
})
export class SubjectsModule {}
