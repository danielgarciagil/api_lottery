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
      console.log(error);
      throw new BadRequestException(error?.detail);
    }
  }

  async findAll(): Promise<User[]> {
    throw new NotFoundException('Falta implementar');
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new NotFoundException('Falta');
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new BadRequestException('mail/password incorrect 2');
    }
    return user;
  }

  //async update(id: string, updateUserInput: UpdateUserInput) {
  //  return `This action updates a #${id} user`;
  //}

  async block(id: string): Promise<User> {
    throw new NotFoundException('Falta implementar');
  }
}
