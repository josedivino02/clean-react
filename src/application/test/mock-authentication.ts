import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import {
  type Authentication,
  type AuthenticationParams,
} from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams.Input;
  callsCount = 0;

  async auth(params: AuthenticationParams.Input): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  }
}
