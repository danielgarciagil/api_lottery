import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateLotenetApiInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  longitud: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo: number;
}

export class FilterSorteo {
  @IsString()
  name: string;
}

export class FilterSorteoHaiti {
  @IsString()
  name: string;

  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) //  AAAA:MM:DD  2022-10-19
  fecha: Date;
}

export class LotoHaitiFormato {
  id_sorteo_pick3: number;
  id_sorteo_pick4: number;
}
