import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bulletin, BulletinSchema } from './schemas/bulletin.schema';
import { Grade, GradeSchema } from '../grade/schemas/grade.schema';
import { Conduct, ConductSchema } from '../conduct/schemas/conduct.schema';
import { Remark, RemarkSchema } from '../remark/schemas/remark.schema';
import { Subject, SubjectSchema } from '../subject/schemas/subject.schema';
import { BulletinService } from './bulletin.service';
import { BulletinController } from './bulletin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bulletin.name, schema: BulletinSchema },
      { name: Grade.name, schema: GradeSchema },
      { name: Conduct.name, schema: ConductSchema },
      { name: Remark.name, schema: RemarkSchema },
      { name: Subject.name, schema: SubjectSchema },
    ]),
  ],
  controllers: [BulletinController],
  providers: [BulletinService],
  exports: [BulletinService],
})
export class BulletinModule {}
