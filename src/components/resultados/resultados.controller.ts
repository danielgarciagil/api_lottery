import { Controller, Get, Query } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { FilterResultadoRestApi } from './dto/filter-resultado.input';

@Controller('resultados')
export class ResultadosController {
  constructor(private readonly resultadosServices: ResultadosService) {}

  @Get()
  async findResultados(
    @Query() params: FilterResultadoRestApi,
  ): Promise<string[]> {
    return this.resultadosServices.devolverResultadoLotenet(params);
  }
}
