import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class BuscarByXpathInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_xpath: number;
}
