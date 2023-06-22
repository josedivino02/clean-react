import {
  HttpPostClientTypes,
  type HttpPostClient,
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(params: HttpPostClientTypes.Params): Promise<void> {
    this.url = params.url;

    await Promise.resolve();
  }
}
