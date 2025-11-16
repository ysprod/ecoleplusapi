import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicYearsService } from './academicyears.service';
import { AcademicYearsController } from './academicyears.controller';
import {
  AcademicYear,
  AcademicYearSchema,
} from './schemas/academic-year.schema';
import { Term, TermSchema } from '../term/schemas/term.schema';
import { SchoolModule } from '../school/school.module';
import { Class, ClassSchema } from '../class/schemas/class.schema';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { Teacher, TeacherSchema } from '../teacher/schemas/teacher.schema';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcademicYear.name, schema: AcademicYearSchema },
      { name: Term.name, schema: TermSchema },
      { name: Class.name, schema: ClassSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Teacher.name, schema: TeacherSchema },
    ]),
  SchoolModule,
  SubjectsModule,
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
  exports: [AcademicYearsService],
})
export class AcademicYearsModule {}
