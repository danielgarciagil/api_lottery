import * as moment from 'moment';

const formatosDeFechas = [
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'ddd MM/DD/YY',
  'dddd, DD-MM-YYYY',
  'dddd, MMMM DD, YYYY',
  'dddd, DD [de] MMMM [de] YYYY',
  'dddd, MMM DD, YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'dddd, MMMM D, YYYY',
];

const parsearFecha = (fecha: string): moment.Moment | null => {
  for (const formato of formatosDeFechas) {
    const fechaParseadaES = moment(fecha, formato, 'es', true);
    if (fechaParseadaES.isValid()) {
      return fechaParseadaES;
    }

    const fechaParseadaEN = moment(fecha, formato, 'en', true);
    if (fechaParseadaEN.isValid()) {
      return fechaParseadaEN;
    }
  }
  return null;
};

export const validarFecha = (
  fechaXpath: string,
  fechaABuscar: string,
): string => {
  console.log(fechaXpath);
  const verificar_fecha = parsearFecha(fechaXpath);
  if (!verificar_fecha) throw new Error('La fecha no es válida');
  if (verificar_fecha.format('YYYY-MM-DD') !== fechaABuscar)
    throw new Error('No es la fecha a bsucar');

  return verificar_fecha.format('YYYY-MM-DD');
};

//
////TODO agregar todas las fechas
//export const validarFecha = (
//  fechaXpath: string,
//  fecha_a_buscar: string,
//): string => {

//  //console.log(fecha_a_buscar);
//  // Intentamos parsear la fecha en español e inglés
//  moment.locale('es');
//  const fechaParseadaEs = moment(fechaXpath, formatosDeFecha);
//  moment.locale('en');
//  const fechaParseadaEn = moment(fechaXpath, formatosDeFecha);
//
//  // Verificamos si alguna de las dos fechas es válida y si es igual a la fecha original
//  if (fechaParseadaEs.isValid()) {
//    const newFechaXpath = convertir_date(fechaParseadaEs, 'es'); //todo revisar si no me cambia la fecha al dia siguinte
//    if (newFechaXpath == fecha_a_buscar) {
//      return newFechaXpath;
//    }
//  }
//
//  if (fechaParseadaEn.isValid()) {
//    console.log(`AQUIIII => ${fechaParseadaEn}`);
//    const newFechaXpath = convertir_date(fechaParseadaEn, 'en'); //todo revisar si no me cambia la fecha al dia siguinte
//    if (newFechaXpath == fecha_a_buscar) {
//      return newFechaXpath;
//    }
//  }
//
//  console.log(fecha_a_buscar);
//  throw new Error('La fecha no es válida');
//};

export const fecha_actual = (): string => {
  const fechaActual = moment().format('YYYY-MM-DD');
  console.log(`LLAMO A FECHA ACTUAL => ${fechaActual}`);
  return fechaActual;
};

export const convertir_formato_date = (date: string): string => {
  const fechaActual = moment.utc(date).format('DD-MM-YYYY');
  return fechaActual;
};
