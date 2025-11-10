import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CogesService } from './coges.service';
import { CogesController } from './coges.controller';
import { Coges, CogesSchema } from './schemas/coges.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Parent, ParentSchema } from 'src/parent/schemas/parent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coges.name, schema: CogesSchema },
      { name: User.name, schema: UserSchema }, // 👈 ajout User
      { name: Parent.name, schema: ParentSchema }, // 👈 ajout Parent
    ]),
  ],
  controllers: [CogesController],
  providers: [CogesService],
})
export class CogesModule {}
