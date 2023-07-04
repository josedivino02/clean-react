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
    AccountModel
    >,
  ) {}

  async add(params: AddAccountParams.Input): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return null;
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
