import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Propio
import { SorteoABuscar } from './../../../components/sorteo_a_buscar/entities/sorteo_a_buscar.entity';

@Entity({ name: 'res_sor_bus' })
@ObjectType()
export class ResponseSorteoABuscar {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  message: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  is_error: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @ManyToOne(
    () => SorteoABuscar,
    (sorteoABuscar) => sorteoABuscar.response_sorteo_a_buscar,
  )
  @JoinColumn({ name: 'id_sorteo_a_bsucar' })
  sorteo_a_buscar: SorteoABuscar;
}
