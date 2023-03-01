import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PremiosDiasService } from './premios-dias.service';
import { PremiosDiasResolver } from './premios-dias.resolver';
import { PremiosDia } from './entities/premios-dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PremiosDia])],
  providers: [PremiosDiasResolver, PremiosDiasService],
})
export class PremiosDiasModule {}
