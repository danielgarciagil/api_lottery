import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//Propios
import { Item } from './../../../components/items/entities/item.entity';
import { List } from './../../../components/lists/entities/list.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', name: 'full_name' })
  @Field(() => String)
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  //@Field(() => String)
  password: string;

  @Column({ type: 'text', array: true, default: [] })
  @Field(() => [String])
  roles: string[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.lastUpdateBy, {
    nullable: true,
    lazy: true, // Use lazy para que la relacion cargue sola
  })
  @JoinColumn({ name: 'last_update_by_id' })
  @Field(() => User, { nullable: true })
  lastUpdateBy?: User;

  @OneToMany(() => Item, (item) => item.user, { lazy: true })
  //@Field(() => [Item]) Quite esto para que grapsQl no sepa, para hacerlo de otra manera
  items: Item[];

  @OneToMany(() => List, (list) => list.user, { lazy: true })
  lists: List[];

  //TODO: Relaciones y demas
}
