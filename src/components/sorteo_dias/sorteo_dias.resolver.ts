import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { SorteoDiasService } from './sorteo_dias.service';
import { SorteoDias } from './entities/sorteo_dia.entity';
import { CreateSorteoDiaInput } from './dto/create-sorteo_dia.input';
import { UpdateSorteoDiaInput } from './dto/update-sorteo_dia.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => SorteoDias)
export class SorteoDiasResolver {
  constructor(private readonly sorteoDiasService: SorteoDiasService) {}

  @Mutation(() => SorteoDias)
  createSorteoDia(
    @Args('createSorteoDiaInput') createSorteoDiaInput: CreateSorteoDiaInput,
  ) {
    return this.sorteoDiasService.create(createSorteoDiaInput);
  }

  @Query(() => [SorteoDias], { name: 'sorteoDias' })
  findAll() {
    return this.sorteoDiasService.findAll();
  }

  @Query(() => SorteoDias, { name: 'sorteoDia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sorteoDiasService.findOne(id);
  }

  @Mutation(() => SorteoDias)
  updateSorteoDia(
    @Args('updateSorteoDiaInput') updateSorteoDiaInput: UpdateSorteoDiaInput,
  ) {
    return this.sorteoDiasService.update(
      updateSorteoDiaInput.id,
      updateSorteoDiaInput,
    );
  }

  @Mutation(() => SorteoDias)
  removeSorteoDia(@Args('id', { type: () => Int }) id: number) {
    return this.sorteoDiasService.remove(id);
  }
}
