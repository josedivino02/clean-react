export namespace HttpGetClientParams {
  export type Input = {
    url: string;
  };
}

export interface HttpGetClient {
  get: (params: HttpGetClientParams.Input) => Promise<void>;
}
