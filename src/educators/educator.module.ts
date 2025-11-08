import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from '../classes/schemas/class.schema';
import { EducatorRepository } from './educator.repository';
import { EducatorService } from './educator.service';
import { EducatorController } from './educator.controller';
import { TeacherService } from '../teacher/teacher.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }])],
  providers: [EducatorRepository, EducatorService, TeacherService],
  controllers: [EducatorController],
})
export class EducatorModule {}