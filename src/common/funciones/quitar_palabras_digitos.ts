export const quitar_palabras_de_digitos = (digito: string): string => {
  if (digito.includes('1er.')) digito = digito.replace('1er.', '');
  if (digito.includes('2do.')) digito = digito.replace('2do.', '');
  if (digito.includes('3er.')) digito = digito.replace('3er.', '');
  const newDigito = digito.replace(/\D/g, '');
  return newDigito;
};
