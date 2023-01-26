import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from './../../components/users/entities/user.entity';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

export const UsersFactory = setSeederFactory(User, (fake: Faker) => {
  const user = new User();
  user.fullName = fake.name.fullName();
  user.email = fake.internet.email();
  user.roles = [ValidRoles.USER];
  user.password = '12345678';
  return user;
});
