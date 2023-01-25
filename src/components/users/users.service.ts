import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

//Propias
import { User } from './entities/user.entity';
import { SignupInput } from './../../auth/dto/signup.input';
import { MESSAGE } from './../../config/messages';
import { ValidRoles } from './../../auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private logger: Logger = new Logger('UsersService');

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error?.detail);
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    // Aqui devulevo el finde si no me manda roles
    if (roles.length === 0)
      return this.userRepository.find({
        relations: {
          lastUpdateBy: true,
        },
      });

    // Aqui hago mi query en si
    return this.userRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]') // Aqui estoy buscando en el arreglo de roles y tienen que estar en el rol que estoy mandando
      .setParameter('roles', roles) // Aqui defino el parametro que estoy mandnado y defino cual es
      .getMany();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
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
  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    updateByUser: User,
  ): Promise<User> {
    try {
      const userUpdate = await this.userRepository.preload({
        ...updateUserInput,
        id: id,
        lastUpdateBy: updateByUser,
      });
      userUpdate.lastUpdateBy = updateByUser;
      if (!userUpdate) {
        throw new Error(MESSAGE.ESTE_ID_NO_EXISTE); //TODO controlar errrores
      }
      return await this.userRepository.save(userUpdate);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error?.detail);
    }
  }

  async block(id: string, user: User): Promise<User> {
    const userToBlock = await this.findOneById(id);
    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = user;
    return this.userRepository.save(userToBlock);
  }
}
