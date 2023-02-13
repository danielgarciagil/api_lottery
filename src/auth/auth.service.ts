import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//Propios
import { AuthResponse } from './types/auth-response.types';
import { SignupInput } from './dto/signup.input';
import { UsersService } from './../components/users/users.service';
import { LoginInput } from './dto/login.input';
import { payloadTokenInterface } from './interface/token-payload.interface';
import { User } from './../components/users/entities/user.entity';
import { MESSAGE } from './../config/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payloadToken: payloadTokenInterface) {
    return this.jwtService.sign({ id: payloadToken.id });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const token = this.getJwtToken({ id: user.id });
    const response: AuthResponse = {
      token: token,
      user: user,
    };
    return response;
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }

    const token = this.getJwtToken({ id: user.id });
    //TODO guardar nuevo token
    const response: AuthResponse = {
      token: token,
      user: user,
    };
    return response;
  }

  //Revalidar el token del que es enviado, generar uno nuevo
  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken({ id: user.id });
    const response: AuthResponse = {
      token: token,
      user: user,
    };
    return response;
  }

  //Validar que el suuario exista para la strategya del Jwl
  //TODO cambair si mando un uuid mal en el payload me dice que no fue encontrado
  async validateUser(id: number): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user.activo) {
      throw new UnauthorizedException(MESSAGE.SU_USUARIO_ESTA_INACTIVO);
    }
    delete user.password;
    return user;
  }
}
