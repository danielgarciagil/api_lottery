import { BadGatewayException, Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.types';
import { SignupInput } from './dto/signup.input';
import { UsersService } from './../components/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    // TODO: Crear un usuario
    const user = await this.usersService.create(signupInput);
    return {
      token: '',
      user: user,
    };
    // TODO Crear el token
  }
}
