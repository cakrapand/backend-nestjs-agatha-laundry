import { Controller, Get, Param } from '@nestjs/common';
import { PackagesService } from './packages.service';

@Controller('api/packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  async findAll() {
    return await this.packagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.packagesService.findOne(id);
  }
}
