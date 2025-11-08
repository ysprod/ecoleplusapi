import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountingService } from './accounting.service';
import { Accounting, AccountingSchema } from './schemas/accounting.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AccountingController } from './accounting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Accounting.name, schema: AccountingSchema }]),
    AuthModule,
  ],
  controllers: [AccountingController],
  providers: [AccountingService],
  exports: [AccountingService],
})
export class AccountingModule { }