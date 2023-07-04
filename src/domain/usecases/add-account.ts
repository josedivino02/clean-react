import { type AccountModel } from '@/domain/models';

export namespace AddAccountParams {
  export type Input = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export interface AddAccount {
  add: (params: AddAccountParams.Input) => Promise<AccountModel>;
}
