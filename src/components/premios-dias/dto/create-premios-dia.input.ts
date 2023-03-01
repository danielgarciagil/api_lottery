import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, Matches, Min, MinLength } from 'class-validator';

@InputType()
export class CreatePremiosDiaInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) // Expresion regular para recibir la hora en formato HH:mm
  hora: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_lotenet_premio: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_dia: number;
}
