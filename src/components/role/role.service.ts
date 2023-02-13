import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

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
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const { permiso_accion, ...rest } = createRoleInput;

      //TODO revisar este codigo feo
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
      throw new NotFoundException(MESSAGE.No_SE_ENCONTRO_ESTE_ROL);
    }
    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ name });
    return role;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
    return { ...role, id };
  }
}