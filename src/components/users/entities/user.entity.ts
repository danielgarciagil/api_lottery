import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

//PROPIO
import { Role } from './../../../components/role/entities/role.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';
import { Resultado } from './../../../components/resultados/entities/resultado.entity';

@Entity({ name: VALID_ENTITY.USER })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  token: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  activo: boolean;

  @ManyToMany(() => Role, (role) => role.user, { eager: true }) //TODO quite el lazy para no crear una promesa
  @Field(() => [Role])
  role: Role[];

  @BeforeInsert()
  async passwordEncrypt() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  //Entidades externas //todo no coloque el fiel
  @OneToMany(() => Resultado, (resultado) => resultado.user)
  resultados: Resultado[];
}
