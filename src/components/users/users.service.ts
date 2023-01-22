import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { NotFoundError } from 'rxjs';
import { SignupInput } from './../../auth/dto/signup.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create(signupInput);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new NotFoundError('Falta');
  }

  //async update(id: string, updateUserInput: UpdateUserInput) {
  //  return `This action updates a #${id} user`;
  //}

  async block(id: string): Promise<User> {
    throw new NotFoundError('');
  }
}
