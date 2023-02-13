import { registerEnumType } from '@nestjs/graphql';

export enum ENTITY {
  LOTERIA = 'LOTERIA',
  JUEGO = 'JUEGO',
  SORTEO = 'SORTEO',
  USER = 'USER',
  RESULTADOS = 'RESULTADOS',
}

export enum VALID_METHOD {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
}

export enum VALID_ROLES {
  //? Permisos Loterias
  LOTERIA_CREAR = 'LOTERIA_CREAR',
  LOTERIA_UPDATE = 'LOTERIA_UPDATE',
  LOTERIA_VIEW = 'LOTERIA_VIEW',
  LOTERIA_DELETE = 'LOTERIA_DELETE',

  //? Permisos Juego
  JUEGO_CREATE = 'JUEGO_CREATE',
  JUEGO_UPDATE = 'JUEGO_UPDATE',
  JUEGO_VIEW = 'JUEGO_VIEW',
  JUEGO_DELETE = 'JUEGO_DELETE',

  //? Permisos Sorteo
  SORTEO_CREATE = 'SORTEO_CREATE',
  SORTEO_UPDATE = 'SORTEO_UPDATE',
  SORTEO_VIEW = 'SORTEO_VIEW',
  SORTEO_DELETE = 'SORTEO_DELETE',

  //? Permisos Resultados
  RESULTADOS_CREATE = 'RESULTADOS_CREATE',
  RESULTADOS_UPDATE = 'RESULTADOS_UPDATE',
  RESULTADOS_VIEW = 'RESULTADOS_VIEW',
  RESULTADOS_DELETE = 'RESULTADOS_DELETE',

  //? Permisos User
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_VIEW = 'USER_VIEW',
  USER_DELETE = 'USER_DELETE',

  //? Permisos Roles
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_VIEW = 'ROLE_VIEW',
  ROLE_DELETE = 'ROLE_DELETE',
}

//Uso esto para registrar el Enmun en GraphQl
registerEnumType(VALID_ROLES, {
  name: 'ValidRoles',
  description: 'Estos son los Permisos Accios=n validos',
});
