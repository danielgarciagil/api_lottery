import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
import { Juego } from './../../../components/juego/entities/juego.entity';
@Entity({ name: 'loteria' })
@ObjectType()
export class Loteria {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  abreviatura: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  img_url: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => [Juego])
  @OneToMany(() => Juego, (juego) => juego.loteria, { lazy: true })
  juego: Juego[];
}
