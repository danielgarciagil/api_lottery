import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class BuscarBySorteoaBuscarInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo_a_buscar: number;
}

@InputType()
export class BuscarByXpathWebScrapingInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_xpath_a_buscar: number;
}
