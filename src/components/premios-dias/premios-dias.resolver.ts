import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PremiosDiasService } from './premios-dias.service';
import { PremiosDia } from './entities/premios-dia.entity';
import { CreatePremiosDiaInput } from './dto/create-premios-dia.input';
import { UpdatePremiosDiaInput } from './dto/update-premios-dia.input';

@Resolver(() => PremiosDia)
export class PremiosDiasResolver {
  constructor(private readonly premiosDiasService: PremiosDiasService) {}

  @Mutation(() => PremiosDia)
  createPremiosDia(@Args('createPremiosDiaInput') createPremiosDiaInput: CreatePremiosDiaInput) {
    return this.premiosDiasService.create(createPremiosDiaInput);
  }

  @Query(() => [PremiosDia], { name: 'premiosDias' })
  findAll() {
    return this.premiosDiasService.findAll();
  }

  @Query(() => PremiosDia, { name: 'premiosDia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.premiosDiasService.findOne(id);
  }

  @Mutation(() => PremiosDia)
  updatePremiosDia(@Args('updatePremiosDiaInput') updatePremiosDiaInput: UpdatePremiosDiaInput) {
    return this.premiosDiasService.update(updatePremiosDiaInput.id, updatePremiosDiaInput);
  }

  @Mutation(() => PremiosDia)
  removePremiosDia(@Args('id', { type: () => Int }) id: number) {
    return this.premiosDiasService.remove(id);
  }
}
