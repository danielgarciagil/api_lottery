import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LoteriaService } from './loteria.service';
import { Loteria } from './entities/loteria.entity';
import { CreateLoteriaInput } from './dto/create-loteria.input';
import { UpdateLoteriaInput } from './dto/update-loteria.input';

@Resolver(() => Loteria)
export class LoteriaResolver {
  constructor(private readonly loteriaService: LoteriaService) {}

  @Mutation(() => Loteria)
  createLoteria(@Args('createLoteriaInput') createLoteriaInput: CreateLoteriaInput) {
    return this.loteriaService.create(createLoteriaInput);
  }

  @Query(() => [Loteria], { name: 'loteria' })
  findAll() {
    return this.loteriaService.findAll();
  }

  @Query(() => Loteria, { name: 'loteria' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.loteriaService.findOne(id);
  }

  @Mutation(() => Loteria)
  updateLoteria(@Args('updateLoteriaInput') updateLoteriaInput: UpdateLoteriaInput) {
    return this.loteriaService.update(updateLoteriaInput.id, updateLoteriaInput);
  }

  @Mutation(() => Loteria)
  removeLoteria(@Args('id', { type: () => Int }) id: number) {
    return this.loteriaService.remove(id);
  }
}
