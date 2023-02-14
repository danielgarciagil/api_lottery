import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Min } from 'class-validator';

@ArgsType()
export class FilterResultado {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  id_sorteo: number;

  //TODO
  //@Field(() => Int, { nullable: true })
  //@IsOptional()
  //@IsNumber()
  //@Min(1)
  //id_lotery: number;
}
