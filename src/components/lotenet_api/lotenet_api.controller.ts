import { Controller, Get, Query } from '@nestjs/common';
import { LotenetApiService } from './lotenet_api.service';
import { LotenetApi } from './entities/lotenet_api.entity';
import {
  FilterSorteo,
  FilterSorteoHaiti,
} from './dto/create-lotenet_api.input';
import { Loto3_4Service } from './loto3_4.service';
import { LotenetHaitiApi } from '../lotenet_haiti_api/entities/lotenet_haiti_api.entity';

@Controller('lotenet-api')
export class LotenetApiController {
  constructor(
    private readonly lotenetApiService: LotenetApiService,
    private readonly loto3_4Service: Loto3_4Service,
  ) {}

  @Get()
  async findAll(): Promise<LotenetApi[]> {
    // Todo
    return this.lotenetApiService.findAll({ limit: 999, offset: 0 });
  }

  @Get('haiti-api')
  async findAllHaiti(): Promise<LotenetHaitiApi[]> {
    // Todo
    return this.lotenetApiService.findAllHaiti({ limit: 100, offset: 0 });
  }

  @Get('find')
  async findOneByName(
    @Query() filterSorteo: FilterSorteo,
  ): Promise<LotenetApi> {
    // Todo
    return this.lotenetApiService.findOneByName(filterSorteo);
  }

  @Get('findByHaiti')
  async findHaiti(@Query() filterSorteo: FilterSorteoHaiti) {
    return await this.loto3_4Service.numerosHaiti(filterSorteo);
  }
}
