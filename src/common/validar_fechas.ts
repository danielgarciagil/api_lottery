import * as moment from 'moment';
//import 'moment/';
//import 'moment/locale/en';

//TODO agregar todas las fechas
export const validarFecha = (fecha: string): string => {
  const formatosDeFecha = [
    'dddd, MMMM DD, YYYY',
    'dddd, DD [de] MMMM [de] YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'ddd MM/DD/YY',
  ];

  // Intentamos parsear la fecha en español e inglés
  moment.locale('es');
  const fechaParseadaEs = moment(fecha, formatosDeFecha);
  moment.locale('en');
  const fechaParseadaEn = moment(fecha, formatosDeFecha);

  // Verificamos si alguna de las dos fechas es válida y si es igual a la fecha original
  if (fechaParseadaEs.isValid()) {
    return fechaParseadaEs.toISOString().slice(0, 10);
  } else if (fechaParseadaEn.isValid()) {
    return fechaParseadaEn.toISOString().slice(0, 10);
  } else {
    throw new Error('La fecha no es válida');
  }
};
