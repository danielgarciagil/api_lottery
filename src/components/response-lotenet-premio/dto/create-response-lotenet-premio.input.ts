import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateResponseLotenetPremioInput {
  @IsNumber()
  id_lotenet_premio: number;

  @IsString()
  message: string;
}
