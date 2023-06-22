import { type AccountModel } from '@/domain/models/account-model';
import { type AuthenticationParams } from '@/domain/usecases/authentication';
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});
