import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateXpathInput } from './dto/create-xpath.input';
import { UpdateXpathInput } from './dto/update-xpath.input';
import { Xpath } from './entities/xpath.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class XpathService {
  constructor(
    @InjectRepository(Xpath)
    private readonly xpathRepository: Repository<Xpath>,
  ) {}

  async create(createXpathInput: CreateXpathInput): Promise<Xpath> {
    const {
      id_sorteo_a_buscar,
      xpath_digitos,
      xpath_fecha_by_digitos,
      xpath_urls_by_digitos,
      ...rest
    } = createXpathInput;

    if (
      !(
        xpath_digitos.length == xpath_fecha_by_digitos.length &&
        xpath_digitos.length == xpath_urls_by_digitos.length
      )
    ) {
      throw new UnprocessableEntityException(
        MESSAGE.EL_ARREGLO_NO_TIENE_LA_MISMA_POSICIONES,
      );
    }
    try {
      const newXpath = this.xpathRepository.create({
        ...rest,
        xpath_digitos: xpath_digitos,
        xpath_fecha_by_digitos: xpath_fecha_by_digitos,
        xpath_urls_by_digitos: xpath_urls_by_digitos,
        sorteo_a_buscar: { id: id_sorteo_a_buscar },
      });

      await this.xpathRepository.save(newXpath);
      return await this.findOne(newXpath.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Xpath[]> {
    const { limit, offset } = paginationArgs;
    return await this.xpathRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Xpath> {
    const xpath = await this.xpathRepository.findOneBy({ id });
    if (!xpath) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return xpath;
  }

  //TODO tener cuenta los arreglos deben de ser iguales
  async update(id: number, updateXpathInput: UpdateXpathInput): Promise<Xpath> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const xpath = await this.findOne(id);
    try {
      await this.xpathRepository.remove(xpath);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        status: 401,
        error: true,
      };
    }
  }
}
