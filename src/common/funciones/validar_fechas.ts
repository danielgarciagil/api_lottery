import * as moment from 'moment';

export const arrFechasHoy = (): string[] => {
  const fecha = moment();
  const fechaDiaUnDigito = fecha.format('D').replace(/^0+/, '');

  return [
    fecha.format('YYYY-MM-DD'), // PRIMERA
    fecha.format('DD-MM-YYYY'), // LOTERIAS DOMINICANAS / REAL
    fecha.locale('es').format('dddd, DD-MM-YYYY').toUpperCase(), // LOTEDOM
    fecha.locale('en').format('dddd, MMMM D, YYYY'), //FLORIDA OFICIAL
    fecha.format('DD/MM/YYYY'), //KING OFFICIAL
    //!Falta por probar
    fecha.format(`dddd, MMMM ${fechaDiaUnDigito}, YYYY`),
    fecha.format('dddd, MMM D, YYYY'),
    fecha.format(`dddd, MMM ${fechaDiaUnDigito}, YYYY`),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[th] YYYY`),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[st] YYYY`),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[nd] YYYY`),
    fecha.format(`dddd MMMM ${fechaDiaUnDigito}[rd] YYYY`),
    fecha.format('ddd MM/DD/YYYY'),
    fecha.format('dddd MMM Dth YYYY'),
    fecha.format('ddd MM/DD/YY'),
    fecha.format('dddd, MMM D, YYYY'),
    fecha.format('[Resultados] MM/DD/YYYY'),
  ];
};

export const validarFechaQueSeaDeHoy = (
  fechaComprobarXpath: string,
  arrFecha: string[],
): string => {
  console.log(fechaComprobarXpath);
  const is_fecha = arrFecha.includes(fechaComprobarXpath);
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
