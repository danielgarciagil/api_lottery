//import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

//PROPIO
//import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ResponsePropioGQl } from './../../common/response';
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';
//import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
//import { VALID_PERMISO_ACCION } from 'src/config/valid-roles';
//import { User } from '../users/entities/user.entity';
import { BuscarByLotenerPremioInput } from './dto/buscarByLotenetPremio.input';

//TODO por el cron
//@UseGuards(JwtAuthGuard)
@Resolver(() => ResponsePropioGQl)
export class PremiosAutomaticoLotenetResolver {
  constructor(
    private readonly premiosAutomaticoLotenetService: PremiosAutomaticoLotenetService,
  ) {}

  @Mutation(() => ResponsePropioGQl, {
    name: 'generarPremioAutomaticoLotenet',
    description: 'Para premiar Automaticamentnte en Lotenet',
  })
  async generar_premio_automatico(
    //@CurrentUser([]) user: User, //todo revisar permiso
    @Args('buscarByLotenetPremio')
    buscarByLotenetPremio: BuscarByLotenerPremioInput,
  ): Promise<ResponsePropioGQl> {
    return this.premiosAutomaticoLotenetService.premiarLotenet(
      buscarByLotenetPremio.id_lotenet_premio,
    );
  }
}
