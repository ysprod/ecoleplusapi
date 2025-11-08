import { Controller, Post, Body } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportDataDto } from './dtos/support-data.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  async postSupport(@Body() data: SupportDataDto) {
    return this.supportService.postSupport(data);
  }
}
