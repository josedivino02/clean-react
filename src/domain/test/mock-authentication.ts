import { type AccountModel } from '@/domain/models';
import {
  type Authentication,
  type AuthenticationParams,
} from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { mockAccountModel } from './mock-account';

export const mockAuthentication = (): AuthenticationParams.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): AuthenticationParams.Output =>
  mockAccountModel();

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();
  params: AuthenticationParams.Input;
  callsCount = 0;

  async auth(params: AuthenticationParams.Input): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  }
}
