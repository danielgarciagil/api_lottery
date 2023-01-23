import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

//Propio
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from './../components/users/users.module';
import { config } from './../config/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.JWT.JWT_SECRET,
          signOptions: {
            expiresIn: configService.JWT.JWT_EXPIRE,
          },
        };
      },
    }),

    UsersModule,
  ],
})
export class AuthModule {}
