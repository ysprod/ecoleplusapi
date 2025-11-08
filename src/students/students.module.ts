import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student, StudentSchema } from '../students/schemas/student.schema';
import { User, UserSchema } from '../user/schemas/user.schema'; // <-- Ajouté
import { ClassModule } from 'src/class/class.module';
import { ParentModule } from 'src/parent/parent.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: User.name, schema: UserSchema }, // <-- Ajouté ici
    ]),
    forwardRef(() => ClassModule),
    forwardRef(() => ParentModule),
    PaymentModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
