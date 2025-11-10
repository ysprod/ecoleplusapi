import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';
import { Grade, GradeSchema } from './schemas/grade.schema';
import { TeacherModule } from '../teacher/teacher.module';
import { ClassModule } from '../class/class.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]),
    StudentsModule,
    TeacherModule,
    SubjectsModule,
    ClassModule,
  ],
  controllers: [GradeController],
  providers: [GradeService],
  exports: [GradeService],
})
export class GradeModule {}
