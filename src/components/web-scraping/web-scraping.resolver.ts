import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { BuscarByXpathInput } from './dto/buscar-by-xpath.input';
import { User } from './../users/entities/user.entity';
import { WebScrapingXpathService } from './web-scraping-xpath.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => ResponsePropioGQl)
export class WebScrapingResolver {
  constructor(
    private readonly webScrapingXpathService: WebScrapingXpathService,
  ) {}

  @Mutation(() => ResponsePropioGQl, {
    name: 'buscarByXpath',
    description: 'Para Buscar los numeros ganadores de un Sorteo',
  })
  async buscarByXpath(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User,
    @Args('buscarByXpathInput') buscarByXpathInput: BuscarByXpathInput,
  ): Promise<ResponsePropioGQl> {
    return this.webScrapingXpathService.buscar_by_xpath(
      buscarByXpathInput.id_xpath,
    );
  }
}
