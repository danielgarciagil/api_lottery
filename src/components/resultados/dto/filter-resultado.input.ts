import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsNumberString,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';

@ArgsType()
export class FilterResultado {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  id_sorteo: number;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) // AAAA:MM:DD  2022-10-19
  desde: Date;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) //  AAAA:MM:DD  2022-10-19
  hasta: Date;

  //TODO
  //@Field(() => Int, { nullable: true })
  //@IsOptional()
  //@IsNumber()
  //@Min(1)
  //id_lotery: number;
}

export class FilterResultadoRestApi {
  @IsNumberString()
  id_sorteo: number;

  @IsNumberString()
  longitud: number;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) //  AAAA:MM:DD  2022-10-19
  fecha: Date;
}
