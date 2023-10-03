import { Injectable, Logger } from '@nestjs/common';

//PROPIO
import { ApiLotenetService } from './api-lotenet.service';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { ResultadosService } from '../resultados/resultados.service';
import { LotenetPremiosService } from '../lotenet-premios/lotenet-premios.service';
import { ResponsePropioGQl } from './../../common/response';
import { fecha_actual } from '../../common/funciones/validar_fechas';
import { ResponseLotenetPremioService } from '../response-lotenet-premio/response-lotenet-premio.service';
import { pausaBySeg } from './../../common/funciones/bloquearPrograma';
import { TelegramService } from '../telegram/telegram.service';
import { ResponseLotenetPremio } from '../response-lotenet-premio/entities/response-lotenet-premio.entity';

@Injectable()
export class PremiosAutomaticoLotenetService {
  private logger: Logger = new Logger('Premios-Automatico-LOTENET-Services');
  constructor(
    private readonly resultadoService: ResultadosService,
    private readonly lotenetPremioService: LotenetPremiosService,
    private readonly responseLotenetPremio: ResponseLotenetPremioService,
    private readonly telegramService: TelegramService,
  ) {}

  async premiarLotenet(id_lotenet_Premio: number): Promise<ResponsePropioGQl> {
    const lotenetPremio =
      await this.lotenetPremioService.findOne(id_lotenet_Premio);
    const responsePremio = await this.responseLotenetPremio.create({
      message: 'SE INSTANCIO UN PREMIO',
      id_lotenet_premio: lotenetPremio.id,
    });

    this.premiarAutomatico(lotenetPremio, responsePremio.id);
    return {
      error: false,
      message: 'INICIO LOS PREMIOS',
    };
  }

  async saber_si_se_detuvo_manual(
    idResponseSorteo: number,
  ): Promise<ResponseLotenetPremio> {
    return await this.responseLotenetPremio.findOne(idResponseSorteo);
  }

  async premiarAutomatico(
    lotenetPremio: LotenetPremio,
    responsePremio: number,
  ): Promise<ResponsePropioGQl> {
    const fecha_a_premiar = fecha_actual();
    let error = true;
    let message = '';
    let ApiLotenet: ApiLotenetService;
    for (let i = 0; i < lotenetPremio.numeros_intentos; i++) {
      this.logger.debug(`PUBLICANDO => ${lotenetPremio.name} Intentos# ${i}`);

      try {
        const saberResponsePremio =
          await this.saber_si_se_detuvo_manual(responsePremio);
        if (!saberResponsePremio.activo) {
          message = 'SE MANDO A PARAR MANUAL';
          error = false;
          break;
        }
        //todo aqui mandar a validar la response si sigo buscando oh no
        const resultado = await this.resultadoService.devolverResultadoByBecha(
          lotenetPremio.sorteo.id,
          new Date(fecha_a_premiar),
        );
        ApiLotenet = new ApiLotenetService();
        const res = await ApiLotenet.iniciar_premio(resultado, lotenetPremio);
        error = false;
        message = res.message;
        break;
      } catch (errorCatche) {
        //SI ES QUE ESTA PREMIADA MANDO A PARA
        if (errorCatche?.message === 'YA ESTA PREMIADA ESTA LOTERIA') {
          message = errorCatche?.message;
          error = false;
          break;
        }
        //console.log(LotenetPremio);
        this.logger.error(`${errorCatche?.message}`);
        message = errorCatche?.message;
        error = true;
        await pausaBySeg(lotenetPremio.tiempo_de_espera_segundos);
      } finally {
        ApiLotenet = null;
      }
    }
    if (error) {
      await this.responseLotenetPremio.update(responsePremio, {
        completed: true,
        is_error: true,
        message: message,
      });
    } else {
      await this.responseLotenetPremio.update(responsePremio, {
        completed: true,
        is_error: false,
        message: message,
      });
    }
    const newMessage = `\n\nMESSAGE => ${message}. \n\nLOTENETPREMIO => ${lotenetPremio.name}.`;
    this.logger.warn(newMessage.replace(/\n/g, ''));
    //TODO HABILITAR que sea solo con error
    if (error) {
      this.telegramService.sendNotificaciones({ error, message: newMessage });
    }

    return {
      error,
      message: newMessage,
    };
  }
}
