import { Module } from '@nestjs/common';

//PROPIO
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';
import { ApiLotenetService } from './api-lotenet.service';
import { PlataformaModule } from '../plataforma/plataforma.module';
import { PremiosAutomaticoLotenetResolver } from './premios-automatico-lotenet.resolver';
import { ResultadosModule } from '../resultados/resultados.module';
import { LotenetPremiosModule } from '../lotenet-premios/lotenet-premios.module';

@Module({
  imports: [PlataformaModule, ResultadosModule, LotenetPremiosModule],
  providers: [
    PremiosAutomaticoLotenetService,
    ApiLotenetService,
    PremiosAutomaticoLotenetResolver,
  ],
})
export class PremiosAutomaticoLotenetModule {}
