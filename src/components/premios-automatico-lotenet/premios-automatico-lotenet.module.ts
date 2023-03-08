import { Module } from '@nestjs/common';

//PROPIO
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';
import { ApiLotenetService } from './api-lotenet.service';
import { PlataformaModule } from '../plataforma/plataforma.module';
import { PremiosAutomaticoLotenetResolver } from './premios-automatico-lotenet.resolver';
import { ResultadosModule } from '../resultados/resultados.module';
import { LotenetPremiosModule } from '../lotenet-premios/lotenet-premios.module';
import { ResponseLotenetPremioModule } from '../response-lotenet-premio/response-lotenet-premio.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [
    PlataformaModule,
    ResultadosModule,
    LotenetPremiosModule,
    ResponseLotenetPremioModule,
    TelegramModule,
  ],
  providers: [
    PremiosAutomaticoLotenetService,
    ApiLotenetService,
    PremiosAutomaticoLotenetResolver,
  ],
  exports: [PremiosAutomaticoLotenetService],
})
export class PremiosAutomaticoLotenetModule {}
