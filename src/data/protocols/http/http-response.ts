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

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCodeParams.OutPut;
  body?: T;
};
