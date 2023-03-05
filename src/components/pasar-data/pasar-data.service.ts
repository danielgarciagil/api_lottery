import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { response_restapi } from './types/response_restapi.type';
import { ResultadosService } from '../resultados/resultados.service';

//TODO este codigo solo se uso una vez por eso lo comente y lo hice tirado fue apra migrar toda la dato de mongo a sql
@Injectable()
export class PasarDataService implements OnModuleInit {
  constructor(
    private httpSerive: HttpService,
    private resultadoSerice: ResultadosService,
  ) {}

  async obtener_data() {
    const data: response_restapi[] = [];
    this.httpSerive.get('http://localhost:4000/api/v1/loteriasRD').subscribe({
      next: (response) => {
        const dataActual: response_restapi[] = response.data.message;
        dataActual.forEach((e) => {
          const [dia, mes, anio] = e.fecha.split('-');
          const newFecha = `${anio}-${mes}-${dia}`;
          const fecha_resultados = new Date(newFecha);

          const arr_numneros = this.devolver_premios_en_numeros(
            e.numeros_ganadores,
          );

          const id_sorteo = this.devolver_id(e.sorteo, e.loteria);
          if (id_sorteo != 0) {
            this.publicar_interna(fecha_resultados, id_sorteo, arr_numneros);
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(data);
  }

  async publicar_interna(fecha_resultados, id_sorteo, arr_numneros) {
    try {
      this.resultadoSerice.createAutomatico({
        fecha: fecha_resultados,
        id_sorteo: id_sorteo,
        id_user: 1,
        numeros_ganadores: arr_numneros,
      });
      console.log('Publioque');
    } catch (error) {
      console.log(error?.message);
    }
  }
  devolver_id(name_sorteo: string, name_loteria: string): number {
    if (name_sorteo === 'PRIMERA DIA' && name_loteria === 'PRIMERA') {
      return 1;
    } else if (
      name_sorteo === 'KING LOTTERY DIA' &&
      name_loteria === 'KING LOTTERY'
    ) {
      return 15;
    } else if (name_sorteo === 'LA SUERTE' && name_loteria === 'LA SUERTE') {
      return 3;
    } else if (name_sorteo === 'REAL' && name_loteria === 'REAL') {
      return 5;
    } else if (name_sorteo === 'LOTEDOM' && name_loteria === 'LOTEDOM') {
      return 6;
    } else if (name_sorteo === 'GANAMAS' && name_loteria === 'GANAMAS') {
      return 9;
    } else if (name_sorteo === 'MIDDAY' && name_loteria === 'FLORIDA') {
      return 7;
    } else if (name_sorteo === 'MIDDAY' && name_loteria === 'NEW YORK') {
      return 13;
    } else if (name_sorteo === 'LEIDSA' && name_loteria === 'LEIDSA') {
      return 12;
    } else if (
      name_sorteo === 'NACIONAL NOCHE' &&
      name_loteria === 'NACIONAL'
    ) {
      return 10;
    } else if (
      name_sorteo === 'KING LOTTERY NOCHE' &&
      name_loteria === 'KING LOTTERY'
    ) {
      return 16;
    } else if (name_sorteo === 'PRIMERA NOCHE' && name_loteria === 'PRIMERA') {
      return 2;
    } else if (name_sorteo === 'LOTEKA' && name_loteria === 'LOTEKA') {
      return 11;
    } else if (name_sorteo === 'EVENING' && name_loteria === 'FLORIDA') {
      return 8;
    } else if (name_sorteo === 'EVENING' && name_loteria === 'NEW YORK') {
      return 14;
    } else {
      return 0;
    }
  }

  devolver_premios_en_numeros(arr_numeros): number[] {
    const new_arr: number[] = [];
    const nu1 = arr_numeros['NU1'];
    const nu2 = arr_numeros['NU2'];
    const nu3 = arr_numeros['NU3'];
    new_arr.push(Number(nu1));
    new_arr.push(Number(nu2));
    new_arr.push(Number(nu3));
    return new_arr;
  }

  async onModuleInit() {
    console.log('MODULO DE PASAR DATAa');
    //this.obtener_data();
  }
}
