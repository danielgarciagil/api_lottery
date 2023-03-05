export const validar_que_es_un_numero = (numero: any): number => {
  const newNumeroo = parseInt(numero);
  if (isNaN(newNumeroo)) {
    throw new Error(`ESTE XPATH NO ES UN NUMERO => ${numero}`);
  }
  if (newNumeroo >= 0) {
    return newNumeroo;
  } else {
    throw new Error(`ESTE XPATH DIO INFERIOR A 0 ${numero}`);
  }
};
