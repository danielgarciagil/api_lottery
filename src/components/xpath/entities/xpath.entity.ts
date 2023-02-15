import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'xpath' })
@ObjectType()
export class Xpath {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  urls: string[];

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  xpath_digitos: string[][];
}
