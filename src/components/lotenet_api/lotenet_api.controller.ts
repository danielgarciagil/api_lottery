import { Controller, Get, Query } from '@nestjs/common';
import { LotenetApiService } from './lotenet_api.service';
import { LotenetApi } from './entities/lotenet_api.entity';
import { FilterSorteo } from './dto/create-lotenet_api.input';

@Controller('lotenet-api')
export class LotenetApiController {
  constructor(private readonly lotenetApiService: LotenetApiService) {}

  @Get()
  async findAll(): Promise<LotenetApi[]> {
    // Todo
    return this.lotenetApiService.findAll({ limit: 999, offset: 0 });
  }

  @Get('find')
  async findOneByName(
    @Query() filterSorteo: FilterSorteo,
  ): Promise<LotenetApi> {
    // Todo
    return this.lotenetApiService.findOneByName(filterSorteo);
  }
}
