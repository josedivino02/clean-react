import { type GetStorage } from '@/data/protocols/cache';
import {
  type HttpGetClient,
  type HttpGetClientParams,
  type HttpResponse,
} from '@/data/protocols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(params: HttpGetClientParams.Input): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      });
    }
    await this.httpGetClient.get(params);
    return null;
  }
}
