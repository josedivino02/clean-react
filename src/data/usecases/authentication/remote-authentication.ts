import { HttpStatusCodeParams, type HttpClient } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import {
  type Authentication,
  type AuthenticationParams,
} from '@/domain/usecases';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>,
  ) {}

  async auth(
    params: AuthenticationParams.Input,
  ): Promise<RemoteAuthentication.Output> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return httpResponse.body;
      case HttpStatusCodeParams.OutPut.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Output = AccountModel;
}
