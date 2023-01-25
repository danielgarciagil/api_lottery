import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//Propias
import { User } from './../../../components/users/entities/user.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'int' })
  @Field(() => Float)
  quantity: number;

  @Column({ type: 'varchar', name: 'quantity_units', nullable: true })
  @Field(() => String)
  quantityUnits?: string;

  @ManyToOne(() => User, (user) => user.items, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  @Index('user_id_index')
  @Field(() => User)
  user: User;
}
