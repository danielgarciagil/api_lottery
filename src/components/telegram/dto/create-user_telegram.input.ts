import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class CreateUserTelegram {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  user_id: number;
}
