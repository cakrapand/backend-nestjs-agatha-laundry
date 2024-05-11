import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ResponseMessage('OK')
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('OK')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }
}
