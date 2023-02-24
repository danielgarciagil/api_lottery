import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';
import { ResponseSorteoABuscar } from './entities/response_sorteo_a_buscar.entity';
import { CreateResponseSorteoABuscarInput } from './dto/create-response_sorteo_a_buscar.input';
import { UpdateResponseSorteoABuscarInput } from './dto/update-response_sorteo_a_buscar.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//TODO este Resolver a Futuro agregar roels y todos
@UseGuards(JwtAuthGuard)
@Resolver(() => ResponseSorteoABuscar)
export class ResponseSorteoABuscarResolver {
  constructor(
    private readonly responseSorteoABuscarService: ResponseSorteoABuscarService,
  ) {}

  //TODO agregar a futuro si se manda buscar un sorteo individual
  //@Mutation(() => ResponseSorteoABuscar)
  //createResponseSorteoABuscar(
  //  @Args('createResponseSorteoABuscarInput')
  //  createResponseSorteoABuscarInput: CreateResponseSorteoABuscarInput,
  //) {
  //  return this.responseSorteoABuscarService.create(
  //    createResponseSorteoABuscarInput,
  //  );
  //}

  @Query(() => [ResponseSorteoABuscar], {
    name: 'allResponseSorteoABuscar',
    description: 'Obtener todos los Response de SOrteo a Buscar',
  })
  findAll() {
    return this.responseSorteoABuscarService.findAll();
  }

  @Query(() => ResponseSorteoABuscar, {
    name: 'findResponseSorteoABuscar',
    description: 'Obtener un Response especifico',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.responseSorteoABuscarService.findOne(id);
  }

  //@Mutation(() => ResponseSorteoABuscar)
  //updateResponseSorteoABuscar(
  //  @Args('updateResponseSorteoABuscarInput')
  //  updateResponseSorteoABuscarInput: UpdateResponseSorteoABuscarInput,
  //) {
  //  return this.responseSorteoABuscarService.update(
  //    updateResponseSorteoABuscarInput.id,
  //    updateResponseSorteoABuscarInput,
  //  );
  //}

  //@Mutation(() => ResponseSorteoABuscar)
  //removeResponseSorteoABuscar(@Args('id', { type: () => Int }) id: number) {
  //  return this.responseSorteoABuscarService.remove(id);
  //}
}
