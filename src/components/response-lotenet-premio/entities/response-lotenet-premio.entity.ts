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

//PROPIO
import { LotenetPremio } from './../../../components/lotenet-premios/entities/lotenet-premio.entity';

@Entity({ name: 'res_lot_pre' })
@ObjectType()
export class ResponseLotenetPremio {
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

  @Field(() => LotenetPremio, { nullable: true })
  @ManyToOne(
    () => LotenetPremio,
    (lotenetPremio) => lotenetPremio.response_lotenet_premio,
    { lazy: true },
  )
  @JoinColumn({ name: 'id_lotenet_premio' })
  lotenet_premio: LotenetPremio;

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
}
