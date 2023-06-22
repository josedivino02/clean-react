import {
  HttpPostClientParams,
  type HttpPostClient,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCodeParams,
} from '@/data/protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCodeParams.OutPut.ok,
  };

  async post(params: HttpPostClientParams.Input): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
