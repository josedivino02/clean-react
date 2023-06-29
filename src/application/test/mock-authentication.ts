import {
  type Authentication,
  type AuthenticationParams,
} from '@/domain/usecases';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams.Input;

  async auth(params: AuthenticationParams.Input): Promise<AccountModel> {
    this.params = params;
    return await Promise.resolve(this.account);
  }
}
