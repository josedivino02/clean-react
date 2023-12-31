export namespace HttpRequest {
  export type Input = {
    url: string;
    method: HttpMethod;
    body?: any;
    headers?: any;
  };
}

export namespace HttpStatusCodeParams {
  export enum OutPut {
    ok = 200,
    unauthorized = 401,
    noContent = 204,
    badRequest = 400,
    forbidden = 403,
    notFound = 404,
    serverError = 500,
  }
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete';

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCodeParams.OutPut;
  body?: T;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest.Input) => Promise<HttpResponse<R>>;
}
