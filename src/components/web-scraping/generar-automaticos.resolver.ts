import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from '../../common/response';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from '../../config/valid-roles';
import {
  BuscarBySorteoaBuscarInput,
  BuscarByXpathWebScrapingInput,
} from './dto/buscar-by-xpath.input';
import { User } from '../users/entities/user.entity';
import { ResultadosSorteoService } from './resultados-sorteo.service';

//@UseGuards(JwtAuthGuard) //TODO lo comente para el cron automatico
@Resolver(() => ResponsePropioGQl)
export class ProcesoDeSorteoABuscarResolver {
  constructor(private readonly resultadosSorteo: ResultadosSorteoService) {}
  @Mutation(() => ResponsePropioGQl, {
    name: 'generarResultadoAutomatico',
    description: 'Para generar los resultados de un Sorteo en forma Automatica',
  })
  async generarResultadoAutomatico(
    //@CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User, //todo revisar permiso
    @Args('buscarBySorteoaBuscarInput')
    buscarBySorteoaBuscarInput: BuscarBySorteoaBuscarInput,
  ): Promise<ResponsePropioGQl> {
    return this.resultadosSorteo.buscar_generar_autoamtico(
      buscarBySorteoaBuscarInput.id_sorteo_a_buscar,
    );
  }

  @UseGuards(JwtAuthGuard)
  //TODO PONER QUE LA FFECHA SE TENGA QUE ENVIAR PARA VALIDAR QUE ES LA RECIBIDA
  //TODO lo de validar no sera por aqui, me refiero solo dev puede en pro no por mosquittos
  @Mutation(() => RESPONSE_BY_XPATH, {
    name: 'validarXpathIndividual',
    description: 'Para verificar que el Xpath esta bien',
  })
  async validar_xpath_individual(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User, //todo revisar permiso
    @Args('buscarByXpathWebScrapingInput')
    buscarByXpathWebScrapingInput: BuscarByXpathWebScrapingInput,
  ): Promise<RESPONSE_BY_XPATH> {
    return await this.resultadosSorteo.validar_xpath_individual(
      buscarByXpathWebScrapingInput.id_xpath_a_buscar,
    );
  }
}
