import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { User } from './../../../components/users/entities/user.entity';
import { Permiso_Accion } from './permiso_accion.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';

@Entity({ name: VALID_ENTITY.ROLE })
@ObjectType({ description: 'Entidad de Roles' })
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToMany(() => User, (user) => user.role, { lazy: true })
  @JoinTable({ name: 'usuario_role' })
  @Field(() => [User])
  user: User[];

  @ManyToMany(() => Permiso_Accion, (permiso_accion) => permiso_accion.role, {
    //lazy: true,
    eager: true,
  })
  @Field(() => [Permiso_Accion])
  permiso_accion: Permiso_Accion[];
}
