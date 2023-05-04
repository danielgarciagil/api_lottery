import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

//PROPIO
import { CreateResultadoInput } from './dto/create-resultado.input';
import { UpdateResultadoInput } from './dto/update-resultado.input';
import { Resultado } from './entities/resultado.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { ResponsePropioGQl } from './../../common/response';
import { SorteoService } from '../sorteo/sorteo.service';
import {
  FilterResultado,
  FilterResultadoRestApi,
} from './dto/filter-resultado.input';
import { agregar_digitos } from 'src/common/funciones/agregarDigitos';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
    private readonly sorteoService: SorteoService,
  ) {}

  async prevCreate(
    createResultadoInput: CreateResultadoInput,
  ): Promise<Resultado> {
    const { id_sorteo, fecha, numeros_ganadores, id_user } =
      createResultadoInput;
    //! Aqui validos los numeros a publicar con las reglas del juego
    await this.verificar_reglas_sorteo(id_sorteo, numeros_ganadores);

    //! Aqui valido que no exista un resultado con la misma fecha y el mismo sorteo
    await this.verificar_que_no_se_duplique(id_sorteo, fecha);

    const newResultado = this.resultadoRepository.create({
      fecha: fecha,
      numeros_ganadores: numeros_ganadores,
      sorteo: { id: id_sorteo },
      user: { id: id_user },
    });

    await this.resultadoRepository.save(newResultado);
    return this.findOne(newResultado.id);
  }

  async create(createResultadoInput: CreateResultadoInput): Promise<Resultado> {
    try {
      return await this.prevCreate(createResultadoInput);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async createAutomatico(
    createResultadoInput: CreateResultadoInput,
  ): Promise<Resultado> {
    try {
      return await this.prevCreate(createResultadoInput);
    } catch (error) {
      if (
        error.message ===
        MESSAGE.YA_ESTA_PUBLICADO_ESTE_RESULTADO_PARA_ESTA_FECHA
      ) {
        return;
      }
      throw new Error(error?.message);
    }
  }

  async verificar_que_no_se_duplique(id_sorteo: number, fecha: Date) {
    const sorteo = await this.resultadoRepository.findOne({
      where: {
        sorteo: { id: id_sorteo },
        fecha: fecha,
      },
    });
    if (sorteo) {
      throw new Error(MESSAGE.YA_ESTA_PUBLICADO_ESTE_RESULTADO_PARA_ESTA_FECHA);
    }
  }

  async devolverResultadoLotenet(
    params: FilterResultadoRestApi,
  ): Promise<string[]> {
    const resultado = await this.resultadoRepository.findOne({
      where: {
        sorteo: { id: params.id_sorteo },
        fecha: params.fecha,
      },
    });
    //console.log(resultado);
    if (!resultado) {
      return []; //TODo
    }
    const newResultadoString = resultado.numeros_ganadores.map((numero) =>
      agregar_digitos(params.longitud, numero),
    );

    return newResultadoString; //TODo
  }

  async devolverResultadoByBecha(
    id_sorteo: number,
    fecha: Date,
  ): Promise<Resultado> {
    const resultado = await this.resultadoRepository.findOne({
      where: {
        sorteo: { id: id_sorteo },
        fecha: fecha,
      },
    });
    if (resultado) {
      return resultado;
    }
    throw Error(MESSAGE.AUN_NO_ESTAN_PUBLICADOS_LOS_RESULTADOS);
  }

  async verificar_reglas_sorteo(
    id_sorteo: number,
    numeros_ganadores: number[],
  ): Promise<number[]> {
    const sorteo = await this.sorteoService.findOne(id_sorteo);
    const { posiciones, rango_minimo, rango_maximo } = sorteo.juego;

    if (numeros_ganadores.length != posiciones) {
      throw Error(MESSAGE.NO_CUMPLE_CON_LOS_REQUISITOS_DEL_JUEGO);
    }

    for (const numero of numeros_ganadores) {
      if (numero < rango_minimo || numero > rango_maximo) {
        throw Error(MESSAGE.NO_CUMPLE_CON_LOS_REQUISITOS_DEL_JUEGO);
      }
    }

    return numeros_ganadores;
  }

  async findAll(
    paginationArgs: PaginationArgs,
    filterResultado: FilterResultado,
  ): Promise<Resultado[]> {
    const { limit, offset } = paginationArgs;
    const {
      id_sorteo,
      desde = new Date('2020-01-01'),
      hasta = new Date(),
    } = filterResultado;
    return await this.resultadoRepository.find({
      take: limit,
      skip: offset,
      where: {
        sorteo: { id: id_sorteo },
        fecha: Between(desde, hasta),
      },
      order: {
        fecha: 'DESC', //todo
      },
    });
  }

  async findOne(id: number): Promise<Resultado> {
    const resultados = await this.resultadoRepository.findOneBy({ id });
    if (!resultados) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return resultados;
  }

  async update(
    id: number,
    updateResultadoInput: UpdateResultadoInput,
  ): Promise<Resultado> {
    throw new BadGatewayException(); //TODO
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const resultado = await this.findOne(id);
    try {
      await this.resultadoRepository.remove(resultado);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        error: true,
      };
    }
  }
}
