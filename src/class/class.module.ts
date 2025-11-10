import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Class, ClassSchema } from './schemas/class.schema';
import { SchoolModule } from '../school/school.module';
import { StudentsModule } from 'src/students/students.module';
import { Student, StudentSchema } from '../students/schemas/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
    forwardRef(() => SchoolModule),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentsModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
