import { HttpResponse } from './http-response';

export namespace HttpPostClientParams {
  export type Input<T> = {
    url: string;
    body?: T;
  };
}

export interface HttpPostClient<T, R> {
  post: (params: HttpPostClientParams.Input<T>) => Promise<HttpResponse<R>>;
}
