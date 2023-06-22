import { HttpResponse } from './http-response';

export namespace HttpPostClientParams {
  export type Input = {
    url: string;
    body?: object;
  };
}

export interface HttpPostClient {
  post: (params: HttpPostClientParams.Input) => Promise<HttpResponse>;
}
