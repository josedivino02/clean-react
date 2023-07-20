import {
  HttpStatusCodeParams,
  type HttpPostClient,
} from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import { type AddAccount, type AddAccountParams } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams.Input,
      RemoteAddAccount.Output
    >,
  ) {}

  async add(params: AddAccountParams.Input): Promise<RemoteAddAccount.Output> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return httpResponse.body;
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAddAccount {
  export type Output = AccountModel;
}
