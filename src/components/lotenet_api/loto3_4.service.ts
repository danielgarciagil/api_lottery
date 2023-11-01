import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import {
  FilterSorteoHaiti,
  LotoHaitiFormato,
} from './dto/create-lotenet_api.input';
import { ResultadosService } from '../resultados/resultados.service';

@Injectable()
export class Loto3_4Service {
  constructor(private readonly resultadoService: ResultadosService) {}

  validarArreglo(arr: number[], numeros_a_validar: number): undefined {
    if (arr.length !== numeros_a_validar) {
      throw new BadGatewayException('NO CUMPLE CON LA LONGITUD');
    }

    for (let i = 0; i < numeros_a_validar; i++) {
      if (arr[i] < 0 || arr[i] > 9 || !Number.isInteger(arr[i])) {
        throw new BadGatewayException('UN NUMERO ES MAYOR QUE 9'); // Si algún elemento no es un número del 0 al 9, retorna falso
      }
    }
  }

  convertirArrayNumerosAString(arr: number[]): string {
    const resultado: string = arr.join('');
    return resultado;
  }

  saberIdLoto3y4(name: string): LotoHaitiFormato {
    if (name === 'fl_md_haiti_api') {
      return {
        id_sorteo_pick3: 57,
        id_sorteo_pick4: 58,
      };
    }
    if (name === 'ny_md_haiti_api') {
      return {
        id_sorteo_pick3: 62,
        id_sorteo_pick4: 59,
      };
    }
    if (name === 'ga_md_haiti_api') {
      return {
        id_sorteo_pick3: 61,
        id_sorteo_pick4: 60,
      };
    }
    throw new BadRequestException('NO SE ENCONTRO ESTE API');
  }

  async devolverArregloResultadosGandor(
    id_sorteo: number,
    fecha: Date,
  ): Promise<number[]> {
    try {
      const sorteo = await this.resultadoService.devolverResultadoByBecha(
        id_sorteo,
        fecha,
      );
      return sorteo.numeros_ganadores;
    } catch (e) {
      throw new BadGatewayException(e.message);
    }
  }

  async numerosHaiti(filterSorteo: FilterSorteoHaiti) {
    //Aqui tengo los id de cada sorteo estatico
    const idsHaiti = this.saberIdLoto3y4(filterSorteo.name);

    const id_pick3 = idsHaiti.id_sorteo_pick3;
    const id_pick4 = idsHaiti.id_sorteo_pick4;
    const numerosPick3 = await this.devolverArregloResultadosGandor(
      id_pick3,
      filterSorteo.fecha,
    );
    const numerosPick4 = await this.devolverArregloResultadosGandor(
      id_pick4,
      filterSorteo.fecha,
    );
    return this.combinaciones(numerosPick3, numerosPick4);
  }

  combinaciones(pega3: number[], pega4: number[]) {
    //TODO vlidar que sea un pega 3
    this.validarArreglo(pega3, 3);

    //TODO calidar que sea un pega 4
    this.validarArreglo(pega4, 4);

    const numero_a = pega3[0];
    const numero_b = pega3[1];
    const numero_c = pega3[2];
    const numero_d = pega4[0];
    const numero_e = pega4[1];
    const numero_f = pega4[2];
    const numero_g = pega4[3];

    const quiniela_1 = [numero_b, numero_c];
    const quiniela_2 = [numero_d, numero_e];
    const quiniela_3 = [numero_f, numero_g];
    const loto42 = [numero_b, numero_c, numero_d, numero_e];
    const loto43 = [numero_b, numero_c, numero_f, numero_g];
    const loto51 = [numero_a, numero_b, numero_c, numero_d, numero_e];
    const loto52 = [numero_a, numero_b, numero_c, numero_f, numero_g];
    const loto53 = [numero_c, numero_d, numero_e, numero_f, numero_g];

    return {
      borlete: {
        primera: this.convertirArrayNumerosAString(quiniela_1),
        segunda: this.convertirArrayNumerosAString(quiniela_2),
        tercera: this.convertirArrayNumerosAString(quiniela_3),
      },
      loto3: {
        primera: this.convertirArrayNumerosAString(pega3),
      },
      loto41: {
        primera: this.convertirArrayNumerosAString(pega4),
      },
      loto42: {
        primera: this.convertirArrayNumerosAString(loto42),
      },
      loto43: {
        primera: this.convertirArrayNumerosAString(loto43),
      },
      loto51: {
        primera: this.convertirArrayNumerosAString(loto51),
      },
      loto52: {
        primera: this.convertirArrayNumerosAString(loto52),
      },
      loto53: {
        primera: this.convertirArrayNumerosAString(loto53),
      },
    };
  }
}
