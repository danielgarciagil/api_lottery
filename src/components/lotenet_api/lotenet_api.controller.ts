import { Controller, Get } from '@nestjs/common';
import { LotenetApiService } from './lotenet_api.service';

@Controller('lotenet-api')
export class LotenetApiController {
  constructor(private readonly lotenetApiService: LotenetApiService) {}

  @Get()
  async findAll() {
    // Todo
    return this.lotenetApiService.findAll({ limit: 999, offset: 0 });
  }
}
