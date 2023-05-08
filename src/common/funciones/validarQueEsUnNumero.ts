export const validar_que_es_un_numero = (numero: string): number => {
  const soloNumero = numero.replace(/[^\d]/g, '');
  const newNumeroo = parseInt(soloNumero);
  if (isNaN(newNumeroo)) {
    throw new Error(`ESTE XPATH NO ES UN NUMERO => ${soloNumero}`);
  }
  if (newNumeroo >= 0) {
    return newNumeroo;
  } else {
    throw new Error(`ESTE XPATH DIO INFERIOR A 0 ${soloNumero}`);
  }
};
