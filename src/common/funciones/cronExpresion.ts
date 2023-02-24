//Aqui hago la expresion de Cron //todo validar que sea una expresion valida
export const cronExpression = (date: number, time: string): string => {
  // Obtenemos los valores de hora y minutos de la hora especificada
  const [hora, minuto] = time.split(':');

  // Configuramos la fecha para que coincida con la fecha especificada, y establecemos la hora y minutos
  const cronDate = new Date();
  cronDate.setHours(parseInt(hora, 10));
  cronDate.setMinutes(parseInt(minuto, 10));

  // Obtenemos los valores de segundo, minuto, hora, día del mes, mes y día de la semana
  const minuteCron = cronDate.getMinutes();
  const hourCron = cronDate.getHours();

  // Componemos la expresión de cron con los valores obtenidos
  //const cronExpression = `* ${minuteCron} ${hourCron} * * ${date - 1}`; //todo;
  const cronExpression = `${minuteCron} ${hourCron} * * *`; //todo;

  return cronExpression;
};
