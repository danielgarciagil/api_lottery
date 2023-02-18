import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
//PROOPIO

import {
  VALID_ENTITY,
  VALID_METHOD,
  VALID_PERMISO_ACCION,
} from './../config/valid-roles';
import { Permiso_Accion } from './../components/role/entities/permiso_accion.entity';
import { RoleService } from './../components/role/role.service';
import { UsersService } from './../components/users/users.service';

config();
const configService = new ConfigService();

@Injectable()
export class AppInit implements OnModuleInit {
  private readonly logger = new Logger('App-Init-Seeds');

  constructor(
    @InjectRepository(Permiso_Accion)
    private readonly permisoAccionRepository: Repository<Permiso_Accion>,

    private readonly roleService: RoleService,
    private readonly userService: UsersService,
  ) {}

  devolver_method_default(action: string): VALID_METHOD {
    return action.includes(VALID_METHOD.UPDATE)
      ? VALID_METHOD.UPDATE
      : action.includes(VALID_METHOD.CREATE)
      ? VALID_METHOD.CREATE
      : action.includes(VALID_METHOD.DELETE)
      ? VALID_METHOD.DELETE
      : action.includes(VALID_METHOD.VIEW)
      ? VALID_METHOD.VIEW
      : VALID_METHOD.VIEW; //TODO
  }

  devolver_enttity_default(enttity: string): VALID_ENTITY {
    return enttity.includes(VALID_ENTITY.JUEGO)
      ? VALID_ENTITY.JUEGO
      : enttity.includes(VALID_ENTITY.LOTERIA)
      ? VALID_ENTITY.LOTERIA
      : enttity.includes(VALID_ENTITY.RESULTADO)
      ? VALID_ENTITY.RESULTADO
      : enttity.includes(VALID_ENTITY.SORTEO)
      ? VALID_ENTITY.SORTEO
      : enttity.includes(VALID_ENTITY.USER)
      ? VALID_ENTITY.SORTEO
      : enttity.includes(VALID_ENTITY.XPATH)
      ? VALID_ENTITY.XPATH
      : enttity.includes(VALID_ENTITY.SORTEO_A_BUSCAR)
      ? VALID_ENTITY.SORTEO_A_BUSCAR
      : enttity.includes(VALID_ENTITY.SORTEO_DIAS)
      ? VALID_ENTITY.SORTEO_DIAS
      : VALID_ENTITY.FALTA; //TODO
  }

  //? Aqui creo todos los permiso accion por default
  async crear_todos_los_permisos_accion() {
    this.logger.debug('Creando todos los permiso accion');
    const roles = Object.values(VALID_PERMISO_ACCION).map((name) => ({
      action: name,
      method: this.devolver_method_default(name),
      entity: this.devolver_enttity_default(name),
    }));
    for (const role of roles) {
      const verificar = await this.permisoAccionRepository.findOneBy({
        action: role.action,
      });
      if (!verificar) {
        const newPermiso = this.permisoAccionRepository.create({
          action: role.action,
          method: role.method,
          entity: role.entity,
        });
        await this.permisoAccionRepository.save(newPermiso);
      }
    }
  }

  //? Aqui obtengo todos los id de las acciones creadas por default
  async ids_Accion_ByMethod(method: VALID_METHOD) {
    this.logger.debug('Buscando todos los ID validos de Permiso_Accion');
    const ids: number[] = [];
    const roles = await this.permisoAccionRepository.findBy({ method });
    for (const accion of roles) {
      ids.push(accion.id);
    }
    return ids;
  }

  //? Aqui creo un rol por Default, con el nombre del rol y los permiso que tendra
  //TODO si ya el permiso existe, siempre actualizar el app para caragr los nuevos roles
  async crear_rol_Default(
    name_rol: string,
    ids_permiso_accion: number[],
  ): Promise<number> {
    const verificar_rol = await this.roleService.findOneByName(name_rol);
    if (!verificar_rol) {
      this.logger.debug(`Creando el Rol: ${name_rol}`);
      const rol = await this.roleService.create({
        descripcion: name_rol,
        name: name_rol,
        permiso_accion: ids_permiso_accion,
      });
      return rol.id;
    } else {
      //todo
      await this.roleService.update(verificar_rol.id, {
        permiso_accion: ids_permiso_accion,
        descripcion: verificar_rol.descripcion,
        name: verificar_rol.name,
        id: verificar_rol.id,
      });
    }
    return verificar_rol.id;
  }

  //? Esta funcion crear un user por Default y se le mando sus roles
  async crear_User_Default(
    ids_roles: number[],
    email: string,
    password: string,
  ) {
    const userAdmin = await this.userService.findOneByEmailSinError(email);
    if (!userAdmin) {
      this.logger.debug(`Creando el User: ${email}`);
      await this.userService.create({
        email: email,
        name: email,
        nickname: email,
        password: password,
        role: ids_roles,
      });
    }
  }

  async crear_rol_ROOT_devulve_su_id(): Promise<number> {
    const TODOS_IDS: number[] = [];
    const NAME_ROOT = 'ROOT';

    const IDS_CREATE = await this.ids_Accion_ByMethod(VALID_METHOD.CREATE);
    const IDS_VIEW = await this.ids_Accion_ByMethod(VALID_METHOD.VIEW);
    const IDS_DELETE = await this.ids_Accion_ByMethod(VALID_METHOD.DELETE);
    const IDS_UPDATE = await this.ids_Accion_ByMethod(VALID_METHOD.UPDATE);

    TODOS_IDS.push(...IDS_CREATE, ...IDS_VIEW, ...IDS_DELETE, ...IDS_UPDATE);

    //Creo un Rol Deault
    const id_root = await this.crear_rol_Default(NAME_ROOT, TODOS_IDS);
    return id_root;
  }

  async crear_rol_ADMIN_devulve_su_id(): Promise<number> {
    const TODOS_IDS: number[] = [];
    const NAME_ADMIN = 'ADMIN';

    const IDS_CREATE = await this.ids_Accion_ByMethod(VALID_METHOD.CREATE);
    const IDS_VIEW = await this.ids_Accion_ByMethod(VALID_METHOD.VIEW);
    const IDS_UPDATE = await this.ids_Accion_ByMethod(VALID_METHOD.UPDATE);

    TODOS_IDS.push(...IDS_CREATE, ...IDS_VIEW, ...IDS_UPDATE);

    //Creo un Rol Deault
    const id_admin = await this.crear_rol_Default(NAME_ADMIN, TODOS_IDS);
    return id_admin;
  }

  async crear_rol_USER_devulve_su_id(): Promise<number> {
    const TODOS_IDS: number[] = [];
    const NAME_USER = 'USER';

    const IDS_VIEW = await this.ids_Accion_ByMethod(VALID_METHOD.VIEW);

    TODOS_IDS.push(...IDS_VIEW);

    //Creo un Rol Deault
    const id_user = await this.crear_rol_Default(NAME_USER, TODOS_IDS);
    return id_user;
  }

  async crear_rol_root_and_user_root() {
    const MAIL_ROOT = configService.get('USER_ROT_API_EMAIL');
    const PASSWORD_ROOT = configService.get('USER_ROT_API_PASSWORD');
    //Creo un Rol Deault
    const id_root = await this.crear_rol_ROOT_devulve_su_id();

    //Creo un User Default
    await this.crear_User_Default([id_root], MAIL_ROOT, PASSWORD_ROOT);
  }

  async crear_rol_admin_and_user_admin() {
    const MAIL_ADMIN = configService.get('USER_ADMIN_API_EMAIL');
    const PASSWORD_ADMIN = configService.get('USER_ADMIN_API_PASSWORD');
    //Creo un Rol Deault
    const id_ADMIN = await this.crear_rol_ADMIN_devulve_su_id();

    //Creo un User Default
    await this.crear_User_Default([id_ADMIN], MAIL_ADMIN, PASSWORD_ADMIN);
  }

  async crear_rol_user_and_user_user() {
    const MAIL_USER = configService.get('USER_USER_API_EMAIL');
    const PASSWORD_USER = configService.get('USER_USER_API_PASSWORD');

    //Creo un Rol Deault
    const id_USER = await this.crear_rol_USER_devulve_su_id();

    //Creo un User Default
    await this.crear_User_Default([id_USER], MAIL_USER, PASSWORD_USER);
  }

  //Consultar si existte un admin
  async onModuleInit() {
    this.logger.debug('INICIO DEL MODULO SEEDS - APP_INIT');

    //Creo todos los permisos accion
    await this.crear_todos_los_permisos_accion();

    //Creo el rol ROOT y user ROOT
    await this.crear_rol_root_and_user_root();

    //Creo el rol ADMIN y user ADMIN
    await this.crear_rol_admin_and_user_admin();

    //Creo el rol USER y user USER
    await this.crear_rol_user_and_user_user();

    this.logger.debug('FIN DEL MODULO SEEDS - APP_INIT');
  }
}
