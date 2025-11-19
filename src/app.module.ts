import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicYearsModule } from './academicyears/academicyears.module';
import { AccountingModule } from './accounting/accounting.module';
import { ActivityModule } from './activities/activity.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BulletinModule } from './bulletin/bulletin.module';
import { CantineModule } from './cantine/cantine.module';
import { CarModule } from './cars/car.module';
import { CartoModule } from './carto/carto.module';
import { ClassModule } from './class/class.module';
import { CogesModule } from './coges/coges.module';
import { ConductModule } from './conduct/conduct.module';
import { CoursesModule } from './courses/courses.module';
import { GradeModule } from './grade/grade.module';
import { ParentModule } from './parent/parent.module';
import { PaymentModule } from './payment/payment.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RemarkModule } from './remark/remark.module';
import { RolesModule } from './roles/roles.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SchoolModule } from './school/school.module';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SupportModule } from './support/support.module';
import { TeacherModule } from './teacher/teacher.module';
import { TermModule } from './term/term.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI') || 'mongodb://localhost:27017',
        dbName: config.get<string>('MONGODB_DB') || undefined,
        bufferCommands: false,
        serverSelectionTimeoutMS: 6000,
        socketTimeoutMS: 45000,
      }),
      inject: [ConfigService],
    }),
    SubjectsModule,
    SchoolModule,
    UserModule,
    StudentsModule,
    CarModule,
    GradeModule,
    ParentModule,
    ClassModule,
    TeacherModule,
    AcademicYearsModule,
    AuthModule,
    PaymentModule,
    ScheduleModule,
    CogesModule,
    AccountingModule,
    ActivityModule,
    SupportModule,
    CartoModule,
    PermissionsModule,
    RolesModule,
    CantineModule,
    TermModule,
    ConductModule,
    RemarkModule,
    BulletinModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}