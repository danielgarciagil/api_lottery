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

  ajustarLongitud(arr: string[][]): string[][] {
    const maxLength = Math.max(...arr.map((subArr) => subArr.length));

    const ajustados = arr.map((subArr) => {
      const diff = maxLength - subArr.length;
      const guiones = Array(diff).fill('---');
      return guiones.concat(subArr);
    });

    return ajustados;
  }

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
        xpath_digitos.length === xpath_fecha_by_digitos.length &&
        xpath_digitos.length === xpath_urls_by_digitos.length
      )
    ) {
      throw new UnprocessableEntityException(
        MESSAGE.EL_ARREGLO_NO_TIENE_LA_MISMA_POSICIONES,
      );
    }
    //IGUALO TODOS LOS ARREGLOS PARA QUE TENGA LA MISMA LONGITUD
    const newXpath_digitos = this.ajustarLongitud(xpath_digitos);
    const newXpath_fecha_by_digitos = this.ajustarLongitud(
      xpath_fecha_by_digitos,
    );
    const newXpath_urls_by_digitos = this.ajustarLongitud(
      xpath_urls_by_digitos,
    );

    try {
      const newXpath = this.xpathRepository.create({
        ...rest,
        xpath_digitos: newXpath_digitos,
        xpath_fecha_by_digitos: newXpath_fecha_by_digitos,
        xpath_urls_by_digitos: newXpath_urls_by_digitos,
        sorteo_a_buscar: { id: id_sorteo_a_buscar },
      });

      await this.xpathRepository.save(newXpath);
      return await this.findOne(newXpath.id);
    } catch (error) {
      //console.log(error);
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

  async findOneSinError(id: number): Promise<Xpath> {
    const xpath = await this.xpathRepository.findOneBy({ id });
    return xpath;
  }

  //TODO tener cuenta los arreglos deben de ser iguales
  async update(id: number, updateXpathInput: UpdateXpathInput): Promise<Xpath> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  //todo crear funcion apra cambair el estado del xpath al ser buscado

  async remove(id: number): Promise<ResponsePropioGQl> {
    const xpath = await this.findOne(id);
    try {
      await this.xpathRepository.remove(xpath);
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
