import { type HttpResponse } from './http-response';

export namespace HttpGetClientParams {
  export type Input = {
    url: string;
  };
}

export interface HttpGetClient<R = any> {
  get: (params: HttpGetClientParams.Input) => Promise<HttpResponse<R>>;
}
