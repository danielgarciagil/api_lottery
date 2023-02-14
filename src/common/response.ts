import { Field, ObjectType } from '@nestjs/graphql';

export interface ResponsePropio {
  details: string;
  data: object;
  status: number;
  message: string;
}

@ObjectType()
export class ResponsePropioGQl {
  @Field(() => String)
  status: number;

  @Field(() => String)
  message: string;
}
