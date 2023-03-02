import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateLotenetPremioInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo: boolean;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_plataforma: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  data_lotenet_id_lottery: number;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  data_lotenet_name_sorteo: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  data_lotenet_name_loteria: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  lotenet_numero_posiciones_premio: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  lotenet_numero_digitos_premio: number;
}
