import { BadRequestException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from './../../config/config';
import { ConfigType } from '@nestjs/config';
import { User } from './../../components/users/entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      secretOrKey: configService.JWT.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User> {
    console.log(payload);
    throw new BadRequestException('FALTA');
  }
}
