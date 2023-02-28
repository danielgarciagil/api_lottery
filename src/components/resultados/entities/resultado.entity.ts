import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
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
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';
import { User } from './../../../components/users/entities/user.entity';

@Entity({ name: VALID_ENTITY.RESULTADO })
@ObjectType()
export class Resultado {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => [Int])
  @Column({ type: 'int', array: true })
  numeros_ganadores: number[];

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  fecha: Date;

  @Field(() => Sorteo)
  @ManyToOne(() => Sorteo, (sorteo) => sorteo.resultados, { lazy: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (usuario) => usuario.resultados, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
