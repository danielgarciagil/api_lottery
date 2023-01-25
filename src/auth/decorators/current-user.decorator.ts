import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid-roles.enum';
import { User } from './../../components/users/entities/user.entity';
import { MESSAGE } from './../../config/messages';

//Este decorador me devolverar el user que se encuentra en el Req de la peticion en la propiedad .user ...
//Siempre y cuando haga pasado por la validacion del token
export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    //console.log(roles);
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException('No user in Req');
    }

    if (roles.length === 0) {
      return user;
    }

    for (const role of user.roles) {
      //TODO eliminar validRoles
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }
    throw new ForbiddenException(
      `${MESSAGE.NO_TIENE_EL_ROL_PARA_ESTA_ACCION} => ${roles}`,
    );
    //return user;
  },
);
