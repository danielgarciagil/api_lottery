import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIOS
import { Item } from './../../../components/items/entities/item.entity';
import { List } from './../../../components/lists/entities/list.entity';

@Entity({ name: 'list_items' })
@ObjectType()
export class ListsItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  quantity: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  completed: boolean;

  //TODO relaciones => manytoone
  @ManyToOne(() => List, (list) => list.listItem, { lazy: true })
  @JoinColumn({ name: 'list_id' })
  //@Field(() => List)
  list: List;

  @ManyToOne(() => Item, (item) => item.listItems, { lazy: true })
  @JoinColumn({ name: 'item_id' })
  @Field(() => Item)
  item: Item;
}
