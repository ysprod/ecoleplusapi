import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { SchoolModule } from 'src/school/school.module';
import { ClassModule } from 'src/class/class.module';
 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    forwardRef(() => SchoolModule),
    forwardRef(() => UserModule),
    forwardRef(() => ClassModule),  
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}