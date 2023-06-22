import {
  HttpPostClientParams,
  type HttpPostClient,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCodeParams,
} from '@/data/protocols/http/http-response';

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCodeParams.OutPut.ok,
  };

  async post(params: HttpPostClientParams.Input<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
