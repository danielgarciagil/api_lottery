import { isEqual } from 'lodash';
import { RESPONSE_BY_XPATH } from '../response';

export const COMPROBAR_XPATH_IGUALES = (
  arr: RESPONSE_BY_XPATH[],
): RESPONSE_BY_XPATH => {
  if (arr.length <= 0) {
    throw new Error('NO SE MANDO NINGUN XPATH A VALIDAR');
  }

  arr.forEach((response) => {
    if (response.error) {
      throw new Error(`UNO DE LOS XPATH DIO UN ERROR => ${response.message}`);
    }
  });

  const arr_iguales = arr.every((elem, index, array) =>
    isEqual(elem, array[0]),
  );

  if (!arr_iguales) {
    throw new Error('LAS RESPUESTA DE XPATH SON DIFERENTES');
  }
  return arr[0];
};
