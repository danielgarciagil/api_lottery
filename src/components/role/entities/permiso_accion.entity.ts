import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import {
  VALID_ENTITY,
  VALID_METHOD,
  VALID_PERMISO_ACCION,
} from './../../../config/valid-roles';
import { Role } from './role.entity';

@Entity({ name: 'permiso_accion' })
@ObjectType({ description: 'Entidad de los permisos con las acciones' })
export class Permiso_Accion {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  action: VALID_PERMISO_ACCION;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar' })
  method: VALID_METHOD;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar' })
  entity: VALID_ENTITY;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo?: boolean;

  @ManyToMany(() => Role, (role) => role.permiso_accion, { lazy: true })
  @JoinTable({
    name: 'rol_pe_ac',
  })
  @Field(() => [Role])
  role: Role[];
}
