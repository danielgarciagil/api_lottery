import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Juego } from './../../../components/juego/entities/juego.entity';
import { Resultado } from './../../../components/resultados/entities/resultado.entity';
import { Loteria } from './../../../components/loteria/entities/loteria.entity';
import { SorteoABuscar } from './../../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { SorteoDias } from './../../sorteo_dias/entities/sorteo_dia.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';
import { LotenetPremio } from './../../../components/lotenet-premios/entities/lotenet-premio.entity';
import { LotenetApi } from './../../../components/lotenet_api/entities/lotenet_api.entity';

@Entity({ name: VALID_ENTITY.SORTEO })
@ObjectType()
export class Sorteo {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  abreviatura: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  img_url?: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Juego)
  @ManyToOne(() => Juego, (juego) => juego.sorteo, { eager: true }) //todo lazy
  @JoinColumn({ name: 'id_juego' })
  juego: Juego;

  @Field(() => [Resultado])
  @OneToMany(() => Resultado, (resultado) => resultado.sorteo, { lazy: true })
  resultados: Resultado[];

  @Field(() => Loteria)
  @ManyToOne(() => Loteria, (loteria) => loteria.sorteo, { lazy: true })
  @JoinColumn({ name: 'id_loteria' })
  loteria: Loteria;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  mostrar_pantalla: boolean;

  @Field(() => SorteoABuscar, { nullable: true }) //TODO puede ser null
  @OneToOne(() => SorteoABuscar, (sorteoABuscar) => sorteoABuscar.sorteo, {
    lazy: true,
  })
  sorteo_a_buscar: SorteoABuscar;

  //todo field
  @Field(() => [SorteoDias])
  @OneToMany(() => SorteoDias, (sorteoDias) => sorteoDias.sorteo, {
    //TODO! TUVE QUE CAMBIAR AQUI por flutter no se si afecte el proceso
    lazy: true,
  })
  sorteo_dias: SorteoDias[];

  //TODO no tiene FIELD
  @OneToMany(() => LotenetPremio, (lotenetPremio) => lotenetPremio.sorteo, {
    lazy: true,
  })
  lotenet_premio: LotenetPremio[];

  @Field(() => LotenetApi)
  @OneToOne(() => LotenetApi, (lotenetApi) => lotenetApi.sorteo, {
    lazy: true,
  })
  lotenet_api: LotenetApi;
}
