import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//propio
import { LotenetPremiosService } from './lotenet-premios.service';
import { LotenetPremiosResolver } from './lotenet-premios.resolver';
import { LotenetPremio } from './entities/lotenet-premio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LotenetPremio])],
  providers: [LotenetPremiosResolver, LotenetPremiosService],
  exports: [LotenetPremiosService],
})
export class LotenetPremiosModule {}
