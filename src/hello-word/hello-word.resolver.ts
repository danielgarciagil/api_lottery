import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWordResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hola Mundo';
  }
}
