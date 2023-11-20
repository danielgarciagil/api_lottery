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
import { User } from '../users/entities/user.entity';
import { date } from 'joi';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
    private readonly sorteoService: SorteoService,
  ) {}

  //TODO revisar que cuando se manda automatico dos veces, se pu blica dos veces
  async prevCreate(
    createResultadoInput: CreateResultadoInput,
    id_user = 1,
  ): Promise<Resultado> {
    const { id_sorteo, fecha, numeros_ganadores } = createResultadoInput;
    //! Aqui validos los numeros a publicar con las reglas del juego
    await this.verificar_reglas_sorteo(id_sorteo, numeros_ganadores);

    //! Aqui valido que no exista un resultado con la misma fecha y el mismo sorteo
    await this.verificar_que_no_se_duplique(id_sorteo, fecha);

    const newResultado = this.resultadoRepository.create({
      fecha: fecha,
      numeros_ganadores: numeros_ganadores,
      sorteo: { id: id_sorteo },
      user: { id: id_user }, //Si es automatico se va a crear con el id uno
    });

    await this.resultadoRepository.save(newResultado);
    return this.findOne(newResultado.id);
  }

  async create(
    createResultadoInput: CreateResultadoInput,
    user: User,
  ): Promise<Resultado> {
    try {
      return await this.prevCreate(createResultadoInput, user.id);
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

  //TODO esta funcion esta mala
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

    if (!resultado) throw new NotFoundException();

    const newResultadoString = resultado.numeros_ganadores.map((numero) =>
      agregar_digitos(params.longitud, numero),
    );

    return newResultadoString;
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
      id_lottery,
      mostrar_pantalla_sorteo,
      desde = new Date('2020-01-01'),
      hasta = new Date(),
    } = filterResultado;

    let new_date;
    if (desde == null) {
      new_date = new Date('2020-01-01');
    } else {
      new_date = desde;
    }
    const whereCondition: any = {
      fecha: Between(new_date, hasta),
    };

    if (id_lottery && id_sorteo) {
      whereCondition.sorteo = {
        id: id_sorteo,
        loteria: {
          id: id_lottery,
        },
      };
    } else if (id_sorteo) {
      whereCondition.sorteo = {
        id: id_sorteo,
      };
      if (mostrar_pantalla_sorteo) {
        whereCondition.sorteo = {
          id: id_sorteo,
          mostrar_pantalla: mostrar_pantalla_sorteo,
        };
      }
    } else if (id_lottery) {
      whereCondition.sorteo = {
        loteria: {
          id: id_lottery,
        },
      };
      if (mostrar_pantalla_sorteo) {
        whereCondition.sorteo = {
          mostrar_pantalla: mostrar_pantalla_sorteo,
          loteria: {
            id: id_lottery,
          },
        };
      }
    }
    if (mostrar_pantalla_sorteo) {
      whereCondition.sorteo = {
        mostrar_pantalla: mostrar_pantalla_sorteo,
      };
    }

    return await this.resultadoRepository.find({
      take: limit,
      skip: offset,
      where: whereCondition,
      order: {
        fecha: 'DESC', //todo
      },
    });
  }

  //async findAll(
  //  paginationArgs: PaginationArgs,
  //  filterResultado: FilterResultado,
  //): Promise<Resultado[]> {
  //  const { limit = 10, offset } = paginationArgs;
  //  const { id_sorteo, desde, hasta = new Date() } = filterResultado;
  //
  //  const query = this.resultadoRepository
  //    .createQueryBuilder('resultado')
  //    .leftJoinAndSelect('resultado.sorteo', 'sorteo')
  //    .where('sorteo.id = :id_sorteo', { id_sorteo })
  //    .andWhere('resultado.fecha BETWEEN :desde AND :hasta', { desde, hasta })
  //    .orderBy('resultado.fecha', 'DESC')
  //    .skip(offset)
  //    .take(limit);
  //
  //  return await query.getMany();
  //}

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
