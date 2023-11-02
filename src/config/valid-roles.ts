export enum VALID_ENTITY {
  DIA = 'DIA',
  JUEGO = 'JUEGO',
  LOTERIA = 'LOTERIA',
  RESULTADO = 'RESULTADO',
  ROLE = 'ROLE',
  SORTEO = 'SORTEO',
  SORTEO_A_BUSCAR = 'SORTEO_A_BUSCAR',
  SORTEO_DIAS = 'SORTEO_DIAS',
  USER = 'USER',
  XPATH = 'XPATH',
  PLATAFORMA = 'PLATAFORMA',
  LOTENET_PREMIO = 'LOTENET_PREMIO',
  FALTA = 'FALTA',
  LOTENET_API = 'LOTENET_API',
  LOTENET_HAITI_API = 'LOTENET_HAITI_API',
}

export enum VALID_DIAS {
  DOMINGO = 'DOMINGO',
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
}

export enum VALID_METHOD {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
}

export enum VALID_PERMISO_ACCION {
  //? Permisos Dias
  DIA_CREATE = 'DIA_CREATE',
  DIA_UPDATE = 'DIA_UPDATE',
  DIA_VIEW = 'DIA_VIEW',
  DIA_DELETE = 'DIA_DELETE',

  //? Permisos SORTEO_A_BUSCAR
  SORTEO_A_BUSCAR_CREATE = 'SORTEO_A_BUSCAR_CREATE',
  SORTEO_A_BUSCAR_UPDATE = 'SORTEO_A_BUSCAR_UPDATE',
  SORTEO_A_BUSCAR_VIEW = 'SORTEO_A_BUSCAR_VIEW',
  SORTEO_A_BUSCAR_DELETE = 'SORTEO_A_BUSCAR_DELETE',

  //? Permisos SORTEO_DIAS
  SORTEO_DIAS_CREATE = 'SORTEO_DIAS_CREATE',
  SORTEO_DIAS_UPDATE = 'SORTEO_DIAS_UPDATE',
  SORTEO_DIAS_VIEW = 'SORTEO_DIAS_VIEW',
  SORTEO_DIAS_DELETE = 'SORTEO_DIAS_DELETE',

  //? Permisos Loterias
  LOTERIA_CREATE = 'LOTERIA_CREATE',
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
  RESULTADO_CREATE = 'RESULTADO_CREATE',
  RESULTADO_UPDATE = 'RESULTADO_UPDATE',
  RESULTADO_VIEW = 'RESULTADO_VIEW',
  RESULTADO_DELETE = 'RESULTADO_DELETE',

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

  //? Permisos Xpath
  XPATH_CREATE = 'XPATH_CREAT',
  XPATH_UPDATE = 'XPATH_UPDATE',
  XPATH_VIEW = 'XPATH_VIEW',
  XPATH_DELETE = 'XPATH_DELETE',

  //? Permisos Plataforma
  PLATAFORMA_CREATE = 'PLATAFORMA_CREATE',
  PLATAFORMA_UPDATE = ' PLATAFORMA_UPDATE',
  PLATAFORMA_VIEW = 'PLATAFORMA_VIEW',
  PLATAFORMA_DELETE = 'PLATAFORMA_DELETE',

  //? Permisos Lotenet_Premio
  LOTENET_PREMIO_CREATE = 'LOTENET_PREMIO_CREATE',
  LOTENET_PREMIO_UPDATE = 'LOTENET_PREMIO_UPDATE',
  LOTENET_PREMIO_VIEW = 'LOTENET_PREMIO_VIEW',
  LOTENET_PREMIO_DELETE = 'LOTENET_PREMIO_DELETE',
}
