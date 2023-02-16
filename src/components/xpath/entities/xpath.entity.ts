import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';
@Entity({ name: 'xpath' })
@ObjectType()
export class Xpath {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  urls: string[];

  @Field(() => [[String]])
  @Column({ type: 'varchar', array: true })
  xpath_digitos: string[][];

  @Field(() => String)
  @Column({ type: 'varchar' })
  xpath_fecha: string;

  @Field(() => Sorteo)
  @OneToOne(() => Sorteo, (sorteo) => sorteo.xpath, { eager: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
