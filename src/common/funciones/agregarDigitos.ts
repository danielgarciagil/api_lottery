export const agregar_digitos = (
  numero_digitos: number,
  numero_premio: number,
): string => {
  if (numero_digitos === numero_premio.toString().length) {
    return numero_premio.toString();
  }
  let newDigito = String(numero_premio);
  const ceros_faltantes = numero_digitos - numero_premio.toString().length;
  for (let i = 0; i < ceros_faltantes; i++) {
    newDigito = '0' + newDigito;
  }
  return newDigito;
};
