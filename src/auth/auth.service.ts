import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

//Propios
import { AuthResponse } from './types/auth-response.types';
import { SignupInput } from './dto/signup.input';
import { UsersService } from './../components/users/users.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //Registrar User
  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    // TODO: Crear un usuario
    const user = await this.usersService.create(signupInput);
    return {
      token: 'TOKEN',
      user: user,
    };
    // TODO Crear el token
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException();
    }
    //TODO token
    return {
      token: 'TOKEN',
      user: user,
    };
  }
}
