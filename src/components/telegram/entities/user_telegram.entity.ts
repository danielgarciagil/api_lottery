import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
//Este bot se creo con un unico motivo que siempre se envien notificaciones
@Entity({ name: 'telegram_user' })
@ObjectType()
export class TelegramUser {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  @Column({ type: 'int', unique: true })
  user_id: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  message_is_not_error: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
