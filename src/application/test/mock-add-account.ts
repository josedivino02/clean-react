import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { type AddAccount, type AddAccountParams } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccountParams.Input;
  callsCount = 0;

  async add(params: AddAccountParams.Input): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  }
}
