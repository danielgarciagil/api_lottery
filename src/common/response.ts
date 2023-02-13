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
  status: string;

  @Field(() => String)
  message: string;
}
