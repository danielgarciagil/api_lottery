import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO

@Entity({ name: 'telegram_user' })
@ObjectType()
export class TelegramUser {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  user_id: number;
}
