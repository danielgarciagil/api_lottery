import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from './../../components/users/entities/user.entity';
import { MESSAGE } from './../../config/messages';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';

//Este decorador me devolverar el user que se encuentra en el Req de la peticion en la propiedad .user ...
//Siempre y cuando haga pasado por la validacion del token
export const CurrentUser = createParamDecorator(
  (roles: VALID_PERMISO_ACCION[], context: ExecutionContext) => {
    //console.log(roles);
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(
        `${MESSAGE.PORFAVOR_COMUNICARSE_CON_EL_ADMINISTRADOR} => Not user in Req`,
      );
    }

    if (roles.length === 0) {
      return user;
    }

    return user;
  },
);
