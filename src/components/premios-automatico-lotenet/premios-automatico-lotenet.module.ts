import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

//PROPIO
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';
import { ApiLotenetService } from './api-lotenet.service';

@Module({
  imports: [HttpModule],
  providers: [PremiosAutomaticoLotenetService, ApiLotenetService],
})
export class PremiosAutomaticoLotenetModule {}
