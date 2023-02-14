import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';

//PROPIO
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { MESSAGE } from './../../config/messages';
import { PaginationArgs } from './../../common/dto/args/pagination.args';
import { Permiso_Accion } from './entities/permiso_accion.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permiso_Accion)
    private readonly permiso_accionRepository: Repository<Permiso_Accion>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const { permiso_accion, ...rest } = createRoleInput;

      const permisos = await this.permiso_accionRepository.find({
        where: {
          id: In(permiso_accion),
        },
      });
      if (permisos.length == 0) {
        throw new Error(MESSAGE.ESTOS_IDS_DE_ACTION_NO_SON_VALIDOS);
      }

      const newRole = this.roleRepository.create({
        ...rest,
        permiso_accion: permisos,
      });
      await this.roleRepository.save(newRole);
      return await this.findOne(newRole.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Role[]> {
    const { limit, offset } = paginationArgs;
    return await this.roleRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name });
    return role;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const { permiso_accion, ...toUpdate } = updateRoleInput;
    const role = await this.findOne(id);
    this.roleRepository.merge(role, toUpdate);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (permiso_accion) {
        const permisos = await this.permiso_accionRepository.find({
          where: {
            id: In(permiso_accion),
          },
        });
        if (permisos.length == 0) {
          throw new Error(MESSAGE.ESTOS_IDS_DE_ACTION_NO_SON_VALIDOS);
        }
        role.permiso_accion = permisos;
      }
      await queryRunner.manager.save(role);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return role;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new UnprocessableEntityException(
        MESSAGE.COMUN_NO_SE_PUDO_ACTUALIZAR,
      );
    }
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return { ...role, id };
  }
}
