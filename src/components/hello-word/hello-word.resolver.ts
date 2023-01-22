import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWordResolver {
  @Query(() => String, {
    description: 'Va a retornar Hola Mundo',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'numeroEntero',
    description: 'Te devuelvo un numero hasta este numero: ',
  })
  getRandomFromZeroTo(
    //Aqui recibo el argumento to
    @Args('to', { nullable: true, type: () => Int }) to: number = 6,
  ): number {
    return Math.round(Math.random() * to);
  }
}
