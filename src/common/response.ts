import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface ResponsePropio {
  details: string;
  data: object;
  status: number;
  message: string;
}

@ObjectType()
export class ResponsePropioGQl {
  @Field(() => String)
  message: string;

  @Field(() => Boolean)
  error: boolean;
}

@ObjectType()
export class RESPONSE_BY_XPATH {
  @Field(() => [Int], { nullable: true })
  data_by_xpath_digitos: number[];

  @Field(() => [String], { nullable: true })
  data_by_xpath_fecha: string[];

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Boolean, { nullable: true })
  error: boolean;
}
