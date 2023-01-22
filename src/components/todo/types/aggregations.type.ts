import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick aggregations' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;

  // Con esto estoy indicando qeu esta propeidad esta obsoleta
  @Field(() => Int, { deprecationReason: 'No usar, mejor use total' })
  totalTodosCompleted: number;
}
