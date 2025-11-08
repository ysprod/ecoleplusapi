import { 
  Controller, Get, Post, Put, Delete, Body, Query, UseGuards 
} from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';
import { GetTransactionsQueryDto } from './dto/get-transactions-query.dto';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('accounting')
@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post()
  async create(
    @Body() createAccountingDto: CreateAccountingDto,
  ) {
    return this.accountingService.create(createAccountingDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() updateAccountingDto: UpdateAccountingDto,
    @GetUser() user: User,
  ) {
    return this.accountingService.update(updateAccountingDto, user._id.toString());
  }

  @Get()
  async getTransactions(
    @Query() query: GetTransactionsQueryDto,
  ) {
    return this.accountingService.getTransactions(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Query('id') id: string,
    @GetUser() user: User,
  ) {
    return this.accountingService.delete(id, user._id.toString());
  }
}
