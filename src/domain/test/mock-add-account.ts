import { type AddAccount, type AddAccountParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { mockAccountModel } from './mock-account';

export const mockAddAccountParams = (): AddAccountParams.Input => {
  const password = faker.internet.password();

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

export const mockAddAccountModel = (): AddAccountParams.Output =>
  mockAccountModel();

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel();
  params: AddAccountParams.Input;
  callsCount = 0;

  async add(params: AddAccountParams.Input): Promise<AddAccountParams.Output> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
