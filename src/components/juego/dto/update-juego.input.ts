import { IsNumber, Min } from 'class-validator';
import { CreateJuegoInput } from './create-juego.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateJuegoInput extends PartialType(
  //Aqui omito el id_loteria
  OmitType(CreateJuegoInput, ['id_loteria'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
