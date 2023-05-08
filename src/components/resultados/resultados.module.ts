import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { ResultadosService } from './resultados.service';
import { ResultadosResolver } from './resultados.resolver';
import { Resultado } from './entities/resultado.entity';
import { SorteoModule } from '../sorteo/sorteo.module';
import { ResponseSorteoABuscarModule } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.module';
import { ResultadosController } from './resultados.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resultado]),
    SorteoModule,
    ResponseSorteoABuscarModule,
  ],
  providers: [ResultadosResolver, ResultadosService],
  exports: [ResultadosService],
  controllers: [ResultadosController],
})
export class ResultadosModule {}
