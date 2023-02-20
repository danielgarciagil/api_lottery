import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import {
  BuscarBySorteoaBuscarInput,
  BuscarByXpathWebScrapingInput,
} from './dto/buscar-by-xpath.input';
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
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User, //todo revisar permiso
    @Args('buscarBySorteoaBuscarInput')
    buscarBySorteoaBuscarInput: BuscarBySorteoaBuscarInput,
  ): Promise<ResponsePropioGQl> {
    return this.procesoDeSorteoBuscarService.iniciar_proceso_sorteo_a_buscar(
      buscarBySorteoaBuscarInput.id_sorteo_a_buscar,
    );
  }

  @Mutation(() => RESPONSE_BY_XPATH, {
    name: 'validarXpathIndividual',
    description: 'Para verificar que el Xpath esta bien',
  })
  async validar_xpath_individual(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User, //todo revisar permiso
    @Args('buscarByXpathWebScrapingInput')
    buscarByXpathWebScrapingInput: BuscarByXpathWebScrapingInput,
  ): Promise<RESPONSE_BY_XPATH> {
    return await this.procesoDeSorteoBuscarService.validar_xpath_individual(
      buscarByXpathWebScrapingInput.id_xpath_a_buscar,
    );
  }
}
