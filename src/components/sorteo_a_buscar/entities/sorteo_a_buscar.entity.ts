import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Sorteo } from './../../sorteo/entities/sorteo.entity';
import { Xpath } from './../../../components/xpath/entities/xpath.entity';
import { ResponseSorteoABuscar } from './../../../components/response_sorteo_a_buscar/entities/response_sorteo_a_buscar.entity';

@Entity({ name: 'so_a_bu' })
@ObjectType()
export class SorteoABuscar {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Int)
  @Column({ type: 'int' })
  numeros_intentos: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  tiempo_de_espera_segundos: number;

  @Field(() => Sorteo) //todo
  @OneToOne(() => Sorteo, (sorteo) => sorteo.sorteo_a_buscar, { eager: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  @Field(() => [Xpath])
  @OneToMany(() => Xpath, (xpath) => xpath.sorteo_a_buscar, { eager: true })
  xpath: Xpath[];

  //todo falta field
  @OneToMany(
    () => ResponseSorteoABuscar,
    (responseSorteoABuscar) => responseSorteoABuscar.sorteo_a_buscar,
    { lazy: true },
  )
  response_sorteo_a_buscar: ResponseSorteoABuscar;
}
