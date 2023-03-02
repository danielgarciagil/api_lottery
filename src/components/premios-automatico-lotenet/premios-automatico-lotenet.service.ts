import { Injectable, Logger } from '@nestjs/common';

//PROPIO
import { ApiLotenetService } from './api-lotenet.service';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { ResultadosService } from '../resultados/resultados.service';
import { LotenetPremiosService } from '../lotenet-premios/lotenet-premios.service';
import { ResponsePropioGQl } from './../../common/response';
import { fecha_actual } from './../../common/validar_fechas';

@Injectable()
export class PremiosAutomaticoLotenetService {
  private logger: Logger = new Logger('Premios-Automatico-Services');
  constructor(
    private readonly apiLotenet: ApiLotenetService,
    private readonly resultadoService: ResultadosService,
    private readonly lotenetPremioService: LotenetPremiosService,
  ) {}

  async onModuleInit() {
    const lote = await this.lotenetPremioService.findOne(5);
    await this.premiarAutomatico(lote);
  }

  async bloquearPrograma(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  }

  async premiarLotenet(id_lotenet_Premio: number): Promise<ResponsePropioGQl> {
    const lotenetPremio = await this.lotenetPremioService.findOneSinError(
      id_lotenet_Premio,
    );
    if (lotenetPremio) {
      this.premiarAutomatico(lotenetPremio);
      return {
        error: false,
        message: 'INICIO LOS PREMIOS',
      };
    }
    return {
      error: true,
      message: 'NO SE ENCONTRO LOTENETPREMIO',
    };
  }

  async premiarAutomatico(
    lotenetPremio: LotenetPremio,
  ): Promise<ResponsePropioGQl> {
    const fecha_a_premiar = fecha_actual();
    let error = true;
    let message = '';
    for (let i = 0; i < lotenetPremio.numeros_intentos; i++) {
      try {
        const resultado = await this.resultadoService.devolverResultadoByBecha(
          lotenetPremio.sorteo.id,
          new Date(fecha_a_premiar),
        );
        const res = await this.apiLotenet.iniciar_premio(
          resultado,
          lotenetPremio,
        );
        this.logger.debug(res);

        if (!res.error) {
          error = false;
          message = res.message;
          break;
        }
        await this.bloquearPrograma(lotenetPremio.tiempo_de_espera_segundos);
      } catch (error) {
        error = true;
        message = error;
        this.logger.error(error);
        await this.bloquearPrograma(lotenetPremio.tiempo_de_espera_segundos);
      }
      return {
        error,
        message,
      };
    }
  }
}
