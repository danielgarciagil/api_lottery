import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
//Este bot se creo con un unico motivo que siempre se envien notificaciones
@Entity({ name: 'telegram_user' })
@ObjectType()
export class TelegramUser {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  user_id: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  message_is_not_error: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
