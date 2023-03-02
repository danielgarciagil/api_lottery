import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class BuscarByLotenerPremioInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_lotenet_premio: number;
}
