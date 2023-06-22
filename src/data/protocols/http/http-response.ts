export namespace HttpStatusCodeParams {
  export enum OutPut {
    unauthorized = 401,
    noContent = 204,
  }
}

export type HttpResponse = {
  statusCode: HttpStatusCodeParams.OutPut;
  body?: any;
};
