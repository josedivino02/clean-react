import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { type AddAccount, type AddAccountParams } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccountParams.Input;

  async add(params: AddAccountParams.Input): Promise<AccountModel> {
    this.params = params;
    return this.account;
  }
}
