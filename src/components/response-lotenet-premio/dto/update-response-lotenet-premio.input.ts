import { IsOptional } from 'class-validator';
import { CreateResponseLotenetPremioInput } from './create-response-lotenet-premio.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResponseLotenetPremioInput extends PartialType(
  CreateResponseLotenetPremioInput,
) {
  @IsOptional()
  message?: string;
}
