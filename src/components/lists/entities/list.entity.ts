import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//Propios
import { User } from './../../../components/users/entities/user.entity';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @ManyToOne(() => User, (user) => user.lists, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  @Index('user_id_index_lists')
  @Field(() => User)
  user: User;
}
