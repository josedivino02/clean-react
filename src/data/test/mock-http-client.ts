import {
  HttpPostClientParams,
  type HttpPostClient,
} from '@/data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;

  async post(params: HttpPostClientParams.Input): Promise<void> {
    this.url = params.url;
    this.body = params.body;

    await Promise.resolve();
  }
}
