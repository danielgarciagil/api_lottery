import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//Propios
import { User } from './../../../components/users/entities/user.entity';
import { ListsItem } from './../../../components/lists-item/entities/lists-item.entity';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @ManyToOne(() => User, (user) => user.lists, { lazy: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Index('user_id_index_lists')
  @Field(() => User)
  user: User;

  @OneToMany(() => ListsItem, (listItems) => listItems.list, { lazy: true })
  //@Field(() => [ListsItem])
  listItem: ListsItem[];
}
