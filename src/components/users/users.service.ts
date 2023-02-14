import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';

//Propias
import { User } from './entities/user.entity';
import { SignupInput } from './../../auth/dto/signup.input';
import { MESSAGE } from './../../config/messages';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs } from './../../common/dto/args';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepositoty: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  private logger: Logger = new Logger('UsersService');

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const { role, ...rest } = signupInput;

      const roles = await this.roleRepositoty.findBy({
        id: In(role),
      });

      if (roles.length == 0) {
        throw new Error(MESSAGE.ESTOS_ID_DE_ROLES_NO_SON_Validos);
      }

      const newUser = this.userRepository.create({
        ...rest,
        token: null,
        role: roles,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error?.detail);
    }
  }

  async updateToken(id: number, token: string): Promise<User> {
    const user = await this.findOneById(id);
    user.token = token;
    return await this.userRepository.save(user);
  }

  async findAll(paginationArgs: PaginationArgs): Promise<User[]> {
    const { limit, offset } = paginationArgs;
    // Aqui devulevo el finde si no me manda roles

    return this.userRepository.find({
      take: limit,
      skip: offset,
    });
    // Aqui hago mi query en si
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
    return user;
  }

  async findOneByEmailSinError(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
    return user;
  }

  // TODO: update by
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const { role, ...toUpdate } = updateUserInput;
    const user = await this.findOneById(id);
    this.userRepository.merge(user, toUpdate);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (role) {
        const roles = await this.roleRepositoty.find({
          where: { id: In(role) },
        });
        if (roles.length == 0) {
          throw new NotFoundException(MESSAGE.ESTOS_ID_DE_ROLES_NO_SON_Validos);
        }
        user.role = roles;
      }
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
      throw new UnprocessableEntityException(
        MESSAGE.COMUN_NO_SE_PUDO_ACTUALIZAR,
      );
    }
  }

  async block(id: number): Promise<User> {
    const userToBlock = await this.findOneById(id);
    userToBlock.activo = false;
    return this.userRepository.save(userToBlock);
  }
}
