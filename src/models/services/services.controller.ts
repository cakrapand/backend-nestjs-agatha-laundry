import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ResponseMessage('OK')
  async findAll() {
    return await this.servicesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('OK')
  async findOne(@Param('id') id: string) {
    return await this.servicesService.findOne(id);
  }
}
