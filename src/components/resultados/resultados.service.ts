import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateResultadoInput } from './dto/create-resultado.input';
import { UpdateResultadoInput } from './dto/update-resultado.input';
import { Resultado } from './entities/resultado.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { ResponsePropioGQl } from 'src/common/response';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(Resultado)
    private readonly resultadoRepository: Repository<Resultado>,
  ) {}

  async create(createResultadoInput: CreateResultadoInput): Promise<Resultado> {
    try {
      const { id_sorteo, ...rest } = createResultadoInput;

      const newResultado = this.resultadoRepository.create({
        ...rest,
        sorteo: { id: id_sorteo },
      });

      await this.resultadoRepository.save(newResultado);
      return this.findOne(newResultado.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Resultado[]> {
    const { limit, offset } = paginationArgs;
    return await this.resultadoRepository.find({
      take: limit,
      skip: offset,
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
        status: 200,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        status: 401,
      };
    }
  }
}
