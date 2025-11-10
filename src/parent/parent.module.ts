import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';
import { Parent, ParentSchema } from './schemas/parent.schema';
import { UserModule } from '../user/user.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => StudentsModule),
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
