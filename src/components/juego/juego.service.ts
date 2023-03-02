import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

//PROPIO
import { CreateJuegoInput } from './dto/create-juego.input';
import { UpdateJuegoInput } from './dto/update-juego.input';
import { Juego } from './entities/juego.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from 'src/common/dto/args';
import { MESSAGE } from 'src/config/messages';
import { ResponsePropioGQl } from 'src/common/response';

@Injectable()
export class JuegoService {
  constructor(
    @InjectRepository(Juego)
    private readonly juegoRepository: Repository<Juego>,
  ) {}

  async create(createJuegoInput: CreateJuegoInput): Promise<Juego> {
    try {
      const { ...rest } = createJuegoInput;

      const newJuego = this.juegoRepository.create({
        ...rest,
      });
      await this.juegoRepository.save(newJuego);
      return this.findOne(newJuego.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Juego[]> {
    const { limit, offset } = paginationArgs;
    return await this.juegoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Juego> {
    const juego = await this.juegoRepository.findOneBy({ id });
    if (!juego) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return juego;
  }

  async update(id: number, updateJuegoInput: UpdateJuegoInput): Promise<Juego> {
    const juego = await this.findOne(id);
    this.juegoRepository.merge(juego, updateJuegoInput);
    return await this.juegoRepository.save(juego);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const juego = await this.findOne(id);
    try {
      await this.juegoRepository.remove(juego);
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
