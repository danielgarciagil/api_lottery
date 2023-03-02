import * as moment from 'moment';

//TODO agregar todas las fechas
export const validarFecha = (
  fechaXpath: string,
  fecha_a_buscar: string,
): string => {
  const formatosDeFecha = [
    'dddd, MMMM DD, YYYY',
    'dddd, DD [de] MMMM [de] YYYY',
    'YYYY-MM-DD',
    'DD-MM-YYYY',
    'ddd MM/DD/YY',
    'dddd, DD-MM-YYYY',
  ];
  //console.log(fecha_a_buscar);
  // Intentamos parsear la fecha en español e inglés
  moment.locale('es');
  const fechaParseadaEs = moment(fechaXpath, formatosDeFecha);
  moment.locale('en');
  const fechaParseadaEn = moment(fechaXpath, formatosDeFecha);

  // Verificamos si alguna de las dos fechas es válida y si es igual a la fecha original
  if (fechaParseadaEs.isValid()) {
    const fechaXpath = fechaParseadaEs.toISOString().slice(0, 10); //todo revisar si no me cambia la fecha al dia siguinte
    if (fechaXpath == fecha_a_buscar) {
      return fechaXpath;
    }
  }

  if (fechaParseadaEn.isValid()) {
    const fechaXpath = fechaParseadaEn.toISOString().slice(0, 10);
    if (fechaXpath == fecha_a_buscar) {
      return fechaXpath;
    }
  } else {
    console.log('LA FECHA NO ES VALIDA');
    throw new Error('La fecha no es válida');
  }
};

export const fecha_actual = (): string => {
  const fechaActual = moment().format('YYYY-MM-DD');
  return fechaActual;
};

export const convertir_formato_date = (date: Date): string => {
  const fechaActual = moment(date).format('DD-MM-YYYY');
  return fechaActual;
};
