import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Sorteo } from './sorteo.entity';
import { Xpath } from './../../../components/xpath/entities/xpath.entity';

@Entity({ name: 'so_a_bu' })
@ObjectType()
export class SorteoABuscar {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  buscando: boolean;

  @OneToOne(() => Sorteo, (sorteo) => sorteo.sorteo_a_buscar, { eager: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  @Field(() => [Xpath])
  @OneToMany(() => Xpath, (xpath) => xpath.sorteo_a_buscar, { eager: true })
  xpath: Xpath[];
}
