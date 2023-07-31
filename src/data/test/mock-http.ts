import {
  HttpStatusCodeParams,
  type HttpClient,
  type HttpRequest,
  type HttpResponse,
} from '@/data/protocols/http';

import faker from 'faker';

export const mockHttpRequest = (): HttpRequest.Input => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  body?: any;
  method?: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCodeParams.OutPut.ok,
  };

  async request(params: HttpRequest.Input): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    this.method = params.method;
    this.headers = params.headers;

    return this.response;
  }
}
