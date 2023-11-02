import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotenetHaitiApi } from './entities/lotenet_haiti_api.entity';
import { LotenetHaitiApiService } from './lotenet_haiti_api.service';
import { LotenetHaitiApiResolver } from './lotenet_haiti_api.resolver';
import { SorteoModule } from '../sorteo/sorteo.module';

@Module({
  imports: [TypeOrmModule.forFeature([LotenetHaitiApi]), SorteoModule],
  providers: [LotenetHaitiApiResolver, LotenetHaitiApiService],
  exports: [LotenetHaitiApiService],
})
export class LotenetHaitiApiModule {}
