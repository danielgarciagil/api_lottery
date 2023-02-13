import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Loteria {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
