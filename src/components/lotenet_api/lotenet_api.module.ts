import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Propio
import { LotenetApiService } from './lotenet_api.service';
import { LotenetApiResolver } from './lotenet_api.resolver';
import { LotenetApi } from './entities/lotenet_api.entity';
import { LotenetApiController } from './lotenet_api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LotenetApi])],
  providers: [LotenetApiResolver, LotenetApiService],
  controllers: [LotenetApiController],
})
export class LotenetApiModule {}
