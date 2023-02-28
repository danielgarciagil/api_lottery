import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResponseLotenetPremioService } from './response-lotenet-premio.service';
import { ResponseLotenetPremio } from './entities/response-lotenet-premio.entity';
import { CreateResponseLotenetPremioInput } from './dto/create-response-lotenet-premio.input';
import { UpdateResponseLotenetPremioInput } from './dto/update-response-lotenet-premio.input';

@Resolver(() => ResponseLotenetPremio)
export class ResponseLotenetPremioResolver {
  constructor(private readonly responseLotenetPremioService: ResponseLotenetPremioService) {}

  @Mutation(() => ResponseLotenetPremio)
  createResponseLotenetPremio(@Args('createResponseLotenetPremioInput') createResponseLotenetPremioInput: CreateResponseLotenetPremioInput) {
    return this.responseLotenetPremioService.create(createResponseLotenetPremioInput);
  }

  @Query(() => [ResponseLotenetPremio], { name: 'responseLotenetPremio' })
  findAll() {
    return this.responseLotenetPremioService.findAll();
  }

  @Query(() => ResponseLotenetPremio, { name: 'responseLotenetPremio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.responseLotenetPremioService.findOne(id);
  }

  @Mutation(() => ResponseLotenetPremio)
  updateResponseLotenetPremio(@Args('updateResponseLotenetPremioInput') updateResponseLotenetPremioInput: UpdateResponseLotenetPremioInput) {
    return this.responseLotenetPremioService.update(updateResponseLotenetPremioInput.id, updateResponseLotenetPremioInput);
  }

  @Mutation(() => ResponseLotenetPremio)
  removeResponseLotenetPremio(@Args('id', { type: () => Int }) id: number) {
    return this.responseLotenetPremioService.remove(id);
  }
}
