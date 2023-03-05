import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateResponseLotenetPremioInput {
  @IsNumber()
  id_lotenet_premio: number;

  @IsString()
  message?: string;

  @IsBoolean()
  completed?: boolean;

  @IsBoolean()
  is_error?: boolean;
}
