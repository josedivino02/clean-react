import { type AccountModel } from '@/domain/models';

export namespace AddAccountParams {
  export type Input = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  export type Output = AccountModel;
}

export interface AddAccount {
  add: (params: AddAccountParams.Input) => Promise<AddAccountParams.Output>;
}
