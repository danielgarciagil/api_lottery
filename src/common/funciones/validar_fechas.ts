import * as moment from 'moment';

export const arrFechasHoy = (): string[] => {
  const fecha = moment();
  const fechaDiaUnDigito = fecha.format('D').replace(/^0+/, '');

  return [
    fecha.format('YYYY-MM-DD').toUpperCase(), // PRIMERA
    fecha.format('DD-MM-YYYY').toUpperCase(), // LOTERIAS DOMINICANAS / REAL
    fecha.locale('es').format('dddd, DD-MM-YYYY').toUpperCase(), // LOTEDOM
    fecha.locale('en').format('dddd, MMMM D, YYYY').toUpperCase(), //FLORIDA OFICIAL
    fecha.format('DD/MM/YYYY'), //KING OFFICIAL //LOTEKA
    fecha
      .locale('es')
      .format('[Sorteo]: DD [de] MMMM [del] YYYY[.]')
      .toUpperCase(), //LEISA
    fecha.locale('en').format('ddd MM/DD/YY').toUpperCase(), //NEW YORK OFICIAL
    //!Falta por probar

    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[th] YYYY`).toUpperCase(),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[st] YYYY`).toUpperCase(),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[nd] YYYY`).toUpperCase(),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[rd] YYYY`).toUpperCase(),
  ];
};
export const validarFechaQueSeaDeHoy = (
  fechaComprobarXpath: string,
  arrFecha: string[],
): string => {
  //console.log(`|${fechaComprobarXpath.trim().toUpperCase()}|`);
  //console.log(arrFecha);
  const is_fecha = arrFecha.includes(fechaComprobarXpath.trim().toUpperCase());
  if (!is_fecha) throw new Error('NO ES LA FECHA A BUSCAR');
  return fechaComprobarXpath;
};

export const fecha_actual = (): string => {
  const fechaActual = moment().format('YYYY-MM-DD');
  return fechaActual;
};

export const convertir_formato_date = (date: string): string => {
  const fechaActual = moment.utc(date).format('DD-MM-YYYY');
  return fechaActual;
};
