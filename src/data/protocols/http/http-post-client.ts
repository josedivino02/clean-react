export namespace HttpPostClientTypes {
  export type Params = {
    url: string;
  };
}

export interface HttpPostClient {
  post: (params: HttpPostClientTypes.Params) => Promise<void>;
}
