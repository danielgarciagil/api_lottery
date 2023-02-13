import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @BeforeInsert()
  async passwordEncrypt() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
