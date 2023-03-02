import { Module } from '@nestjs/common';

//PROPIO
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';
import { ApiLotenetService } from './api-lotenet.service';
import { PlataformaModule } from '../plataforma/plataforma.module';

@Module({
  imports: [PlataformaModule],
  providers: [PremiosAutomaticoLotenetService, ApiLotenetService],
})
export class PremiosAutomaticoLotenetModule {}
