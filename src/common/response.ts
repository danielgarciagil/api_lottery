import { Field, Int, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';

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

  @Field(() => Boolean)
  error: boolean;
}

@ObjectType()
export class RESPONSE_BY_XPATH {
  @Field(() => [Int])
  data_by_xpath_digitos: number[];

  @Field(() => String)
  data_by_xpath_fecha: string;

  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  error: boolean;
}
