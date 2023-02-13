import {
  BadRequestException,
  Injectable,
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
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs } from './../../common/dto/args';

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
    return user;
  }

  // TODO: update by
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const userUpdate = await this.userRepository.preload({
        ...updateUserInput,
        id: id,
      });
      if (!userUpdate) {
        throw new Error(MESSAGE.ESTE_ID_NO_EXISTE); //TODO controlar errrores
      }
      return await this.userRepository.save(userUpdate);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error?.detail);
    }
  }

  async block(id: number): Promise<User> {
    const userToBlock = await this.findOneById(id);
    userToBlock.activo = false;
    return this.userRepository.save(userToBlock);
  }
}
