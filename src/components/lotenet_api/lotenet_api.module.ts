import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { LotenetApiService } from './lotenet_api.service';
import { LotenetApiResolver } from './lotenet_api.resolver';
import { LotenetApi } from './entities/lotenet_api.entity';
import { LotenetApiController } from './lotenet_api.controller';
import { Loto3_4Service } from './loto3_4.service';
import { ResultadosModule } from '../resultados/resultados.module';

@Module({
  imports: [TypeOrmModule.forFeature([LotenetApi]), ResultadosModule],
  providers: [LotenetApiResolver, LotenetApiService, Loto3_4Service],
  controllers: [LotenetApiController],
})
export class LotenetApiModule {}
