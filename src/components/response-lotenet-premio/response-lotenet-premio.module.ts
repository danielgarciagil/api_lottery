import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { ResponseLotenetPremioService } from './response-lotenet-premio.service';
import { ResponseLotenetPremioResolver } from './response-lotenet-premio.resolver';
import { ResponseLotenetPremio } from './entities/response-lotenet-premio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseLotenetPremio])],
  providers: [ResponseLotenetPremioResolver, ResponseLotenetPremioService],
  exports: [ResponseLotenetPremioService],
})
export class ResponseLotenetPremioModule {}
