import * as moment from 'moment';

export const arrFechasHoy = (): string[] => {
  const fecha = moment();
  const fechaDiaUnDigito = fecha.format('D').replace(/^0+/, '');
  const mesEspanol = fecha.format('MMMM');
  const diaEspanol = fecha.format('dddd');

  return [
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
    fecha.format('DD-MM-YYYY'),
    fecha.format('DD/MM/YYYY'),
    fecha.format('YYYY-MM-DD'),
    fecha.format(`Sorteo: DD de ${mesEspanol} del YYYY.`),
    fecha.format(`${diaEspanol}, DD-MM-YYYY`),
    fecha.format('Resultados MM/DD/YYYY'),
    fecha.format(`${diaEspanol}, D de ${mesEspanol} de YYYY`),
  ];
};

export const validarFecha = (
  fechaComprobarXpath: string,
  arrFecha: string[],
): string => {
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
