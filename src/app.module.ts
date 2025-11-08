import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectsModule } from './subjects/subjects.module';
import { AcademicYearsModule } from './academicyears/academicyears.module';
import { SchoolModule } from './school/school.module';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { GradeModule } from './grade/grade.module';
import { StudentsModule } from './students/students.module';
import { ParentModule } from './parent/parent.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CogesModule } from './coges/coges.module';
import { AccountingModule } from './accounting/accounting.module';
import { CarModule } from './cars/car.module';
import { ActivityModule } from './activities/activity.module';
import { SupportModule } from './support/support.module';
import { CartoModule } from './carto/carto.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CantineModule } from './cantine/cantine.module';

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
        serverSelectionTimeoutMS: 5000,
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
    ClassModule, TeacherModule,
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
    CantineModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
