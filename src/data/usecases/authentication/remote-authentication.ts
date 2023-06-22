import { type HttpPostClient } from '@/data/protocols/http/http-post-client';
import { AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams.Input): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params });
  }
}
