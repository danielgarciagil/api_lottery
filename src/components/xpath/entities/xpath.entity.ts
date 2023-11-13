import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { SorteoABuscar } from './../../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';

@Entity({ name: VALID_ENTITY.XPATH })
@ObjectType()
export class Xpath {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  verify_string_date: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => [[String]])
  @Column({ type: 'varchar', array: true })
  xpath_digitos: string[][];

  @Field(() => [[String]])
  @Column({ type: 'varchar', array: true })
  xpath_urls_by_digitos: string[][];

  @Field(() => [[String]])
  @Column({ type: 'varchar', array: true })
  xpath_fecha_by_digitos: string[][];

  @Field(() => SorteoABuscar)
  @ManyToOne(() => SorteoABuscar, (sorteoABuscar) => sorteoABuscar.xpath, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_sorteo_a_buscar' })
  sorteo_a_buscar: SorteoABuscar;
}
