import { RESPONSE_BY_XPATH } from '../response';

export const COMPROBAR_DIGITOS_IGUALES_ARR_XPATH = (
  arr: RESPONSE_BY_XPATH[],
): RESPONSE_BY_XPATH => {
  const arreglo_digito: string[] = [];
  if (arr.length <= 0) {
    throw new Error('NO SE MANDO NINGUN XPATH A VALIDAR');
  }

  arr.forEach((response) => {
    if (response.error) {
      throw new Error(`UNO DE LOS XPATH DIO UN ERROR => ${response.message}`);
    }
    arreglo_digito.push(response.data_by_xpath_digitos.toString());
  });

  const arr_iguales = arreglo_digito.every(
    (elemento) => elemento === arreglo_digito[0],
  );

  if (!arr_iguales) {
    throw new Error('LAS RESPUESTA DE XPATH SON DIFERENTES');
  }
  return arr[0];
};
