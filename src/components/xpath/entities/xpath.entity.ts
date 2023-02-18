import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { SorteoABuscar } from './../../sorteo_a_buscar/entities/sorteo_a_buscar.entity';

@Entity({ name: 'xpath' })
@ObjectType()
export class Xpath {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

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
