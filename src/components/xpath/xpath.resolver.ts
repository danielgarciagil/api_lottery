import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { XpathService } from './xpath.service';
import { Xpath } from './entities/xpath.entity';
import { CreateXpathInput } from './dto/create-xpath.input';
import { UpdateXpathInput } from './dto/update-xpath.input';

@Resolver(() => Xpath)
export class XpathResolver {
  constructor(private readonly xpathService: XpathService) {}

  @Mutation(() => Xpath)
  createXpath(@Args('createXpathInput') createXpathInput: CreateXpathInput) {
    return this.xpathService.create(createXpathInput);
  }

  @Query(() => [Xpath], { name: 'xpath' })
  findAll() {
    return this.xpathService.findAll();
  }

  @Query(() => Xpath, { name: 'xpath' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.xpathService.findOne(id);
  }

  @Mutation(() => Xpath)
  updateXpath(@Args('updateXpathInput') updateXpathInput: UpdateXpathInput) {
    return this.xpathService.update(updateXpathInput.id, updateXpathInput);
  }

  @Mutation(() => Xpath)
  removeXpath(@Args('id', { type: () => Int }) id: number) {
    return this.xpathService.remove(id);
  }
}
