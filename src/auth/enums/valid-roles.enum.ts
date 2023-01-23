import { registerEnumType } from '@nestjs/graphql';

//TODO implementar el ENUM en graphQl
export enum ValidRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_USER = 'SUPER_USER',
}

//Uso esto para registrar el Enmun en GraphQl
registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Estos son los roles validos',
});
