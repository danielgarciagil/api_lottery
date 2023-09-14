import { exec } from 'child_process';

export async function borrarCache(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    //todo colocar que solo me borre la carperta de google como tal
    //exec('sudo rm -rf /tmp/.com.google.Chrom*', (error, stdout, stderr) => {
    //Cambio el nombre ahora es asi
    exec('rm -rf /tmp/.org.chromium.Chrom*', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export async function ejecutarBorradoCache(): Promise<string> {
  try {
    await borrarCache();
    return 'Caché borrada exitosamente';
  } catch (error) {
    return `Error al borrar la caché:', ${error}`;
  }
}
