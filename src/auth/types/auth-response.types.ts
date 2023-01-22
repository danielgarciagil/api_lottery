import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './../../components/users/entities/user.entity';

//Se usa en los Query, en los objectos que queremos responder
@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
