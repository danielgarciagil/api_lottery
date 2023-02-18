import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { BuscarBySorteoWebScrapingInput } from './dto/buscar-by-xpath.input';
import { User } from './../users/entities/user.entity';
import { ProcesoDeSorteoBuscarService } from './proceso_de_sorteo_a_buscar.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => ResponsePropioGQl)
export class ProcesoDeSorteoABuscarResolver {
  constructor(
    private readonly procesoDeSorteoBuscarService: ProcesoDeSorteoBuscarService,
  ) {}

  @Mutation(() => ResponsePropioGQl, {
    name: 'buscarBySorteoAutomatico',
    description:
      'Para Buscar los numeros ganadores de un Sorteo en forma Autoamtica',
  })
  async init_buscar_sorteo_automatico(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User,
    @Args('buscarBySorteoWebScrapingInput')
    buscarBySorteoWebScrapingInput: BuscarBySorteoWebScrapingInput,
  ): Promise<ResponsePropioGQl> {
    return this.procesoDeSorteoBuscarService.buscarBySorteoWebScraping(
      buscarBySorteoWebScrapingInput.id_xpath,
    );
  }
}
