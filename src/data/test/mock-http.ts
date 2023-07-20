import {
  HttpStatusCodeParams,
  type HttpGetClient,
  type HttpGetClientParams,
  type HttpPostClient,
  type HttpPostClientParams,
  type HttpResponse,
} from '@/data/protocols/http';

export class HttpPostClientSpy<T = any, R = any>
  implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCodeParams.OutPut.ok,
  };

  async post(params: HttpPostClientParams.Input<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return await Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCodeParams.OutPut.ok,
  };

  async get(params: HttpGetClientParams.Input): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return this.response;
  }
}
