import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SorteoABuscarService } from './sorteo_a_buscar.service';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';
import { CreateSorteoABuscarInput } from './dto/create-sorteo_a_buscar.input';
import { UpdateSorteoABuscarInput } from './dto/update-sorteo_a_buscar.input';

@Resolver(() => SorteoABuscar)
export class SorteoABuscarResolver {
  constructor(private readonly sorteoABuscarService: SorteoABuscarService) {}

  @Mutation(() => SorteoABuscar)
  createSorteoABuscar(@Args('createSorteoABuscarInput') createSorteoABuscarInput: CreateSorteoABuscarInput) {
    return this.sorteoABuscarService.create(createSorteoABuscarInput);
  }

  @Query(() => [SorteoABuscar], { name: 'sorteoABuscar' })
  findAll() {
    return this.sorteoABuscarService.findAll();
  }

  @Query(() => SorteoABuscar, { name: 'sorteoABuscar' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sorteoABuscarService.findOne(id);
  }

  @Mutation(() => SorteoABuscar)
  updateSorteoABuscar(@Args('updateSorteoABuscarInput') updateSorteoABuscarInput: UpdateSorteoABuscarInput) {
    return this.sorteoABuscarService.update(updateSorteoABuscarInput.id, updateSorteoABuscarInput);
  }

  @Mutation(() => SorteoABuscar)
  removeSorteoABuscar(@Args('id', { type: () => Int }) id: number) {
    return this.sorteoABuscarService.remove(id);
  }
}
