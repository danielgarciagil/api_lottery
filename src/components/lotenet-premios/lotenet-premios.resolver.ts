import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LotenetPremiosService } from './lotenet-premios.service';
import { LotenetPremio } from './entities/lotenet-premio.entity';
import { CreateLotenetPremioInput } from './dto/create-lotenet-premio.input';
import { UpdateLotenetPremioInput } from './dto/update-lotenet-premio.input';

@Resolver(() => LotenetPremio)
export class LotenetPremiosResolver {
  constructor(private readonly lotenetPremiosService: LotenetPremiosService) {}

  @Mutation(() => LotenetPremio)
  createLotenetPremio(@Args('createLotenetPremioInput') createLotenetPremioInput: CreateLotenetPremioInput) {
    return this.lotenetPremiosService.create(createLotenetPremioInput);
  }

  @Query(() => [LotenetPremio], { name: 'lotenetPremios' })
  findAll() {
    return this.lotenetPremiosService.findAll();
  }

  @Query(() => LotenetPremio, { name: 'lotenetPremio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lotenetPremiosService.findOne(id);
  }

  @Mutation(() => LotenetPremio)
  updateLotenetPremio(@Args('updateLotenetPremioInput') updateLotenetPremioInput: UpdateLotenetPremioInput) {
    return this.lotenetPremiosService.update(updateLotenetPremioInput.id, updateLotenetPremioInput);
  }

  @Mutation(() => LotenetPremio)
  removeLotenetPremio(@Args('id', { type: () => Int }) id: number) {
    return this.lotenetPremiosService.remove(id);
  }
}
