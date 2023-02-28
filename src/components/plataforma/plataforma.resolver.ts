import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlataformaService } from './plataforma.service';
import { Plataforma } from './entities/plataforma.entity';
import { CreatePlataformaInput } from './dto/create-plataforma.input';
import { UpdatePlataformaInput } from './dto/update-plataforma.input';

@Resolver(() => Plataforma)
export class PlataformaResolver {
  constructor(private readonly plataformaService: PlataformaService) {}

  @Mutation(() => Plataforma)
  createPlataforma(@Args('createPlataformaInput') createPlataformaInput: CreatePlataformaInput) {
    return this.plataformaService.create(createPlataformaInput);
  }

  @Query(() => [Plataforma], { name: 'plataforma' })
  findAll() {
    return this.plataformaService.findAll();
  }

  @Query(() => Plataforma, { name: 'plataforma' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.plataformaService.findOne(id);
  }

  @Mutation(() => Plataforma)
  updatePlataforma(@Args('updatePlataformaInput') updatePlataformaInput: UpdatePlataformaInput) {
    return this.plataformaService.update(updatePlataformaInput.id, updatePlataformaInput);
  }

  @Mutation(() => Plataforma)
  removePlataforma(@Args('id', { type: () => Int }) id: number) {
    return this.plataformaService.remove(id);
  }
}
