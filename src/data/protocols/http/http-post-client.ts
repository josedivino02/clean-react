import { type HttpResponse } from './http-response';

export namespace HttpPostClientParams {
  export type Input<T = any> = {
    url: string;
    body?: T;
  };
}

export interface HttpPostClient<T = any, R = any> {
  post: (params: HttpPostClientParams.Input<T>) => Promise<HttpResponse<R>>;
}
