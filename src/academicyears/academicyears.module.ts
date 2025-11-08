import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicYearsService } from './academicyears.service';
import { AcademicYearsController } from './academicyears.controller';
import { AcademicYear, AcademicYearSchema } from './schemas/academic-year.schema';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AcademicYear.name, schema: AcademicYearSchema }]),
    SchoolModule,
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
  exports: [AcademicYearsService],
})
export class AcademicYearsModule { }