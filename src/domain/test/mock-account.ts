import { type AccountModel } from '@/domain/models';
import { type AuthenticationParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
  name: faker.person.fullName(),
});
