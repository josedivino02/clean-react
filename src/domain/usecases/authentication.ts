import { type AccountModel } from 'domain/models/account-model';

export namespace AuthenticationParams {
  export type Input = {
    email: string;
    password: string;
  };
}

export interface Authentication {
  auth: (params: AuthenticationParams.Input) => Promise<AccountModel>;
}
