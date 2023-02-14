import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { ResultadosService } from './resultados.service';
import { ResultadosResolver } from './resultados.resolver';
import { Resultado } from './entities/resultado.entity';
import { SorteoModule } from '../sorteo/sorteo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resultado]), SorteoModule],
  providers: [ResultadosResolver, ResultadosService],
})
export class ResultadosModule {}
