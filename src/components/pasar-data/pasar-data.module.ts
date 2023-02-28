import { Module } from '@nestjs/common';
import { PasarDataService } from './pasar-data.service';
import { HttpModule } from '@nestjs/axios';
import { ResultadosModule } from '../resultados/resultados.module';

@Module({
  imports: [HttpModule, ResultadosModule],
  providers: [PasarDataService],
})
export class PasarDataModule {}
