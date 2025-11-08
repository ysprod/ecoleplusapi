import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un paiement' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les paiements (avec filtres)' })
  findAll(@Query() query: any) {
    // Ajoute ici la logique de filtrage selon PaymentFilter si besoin
    return this.paymentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un paiement' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findById(id);
  }
}