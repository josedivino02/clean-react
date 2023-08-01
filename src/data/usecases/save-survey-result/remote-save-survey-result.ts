import { type RemoteSurveyResultModel } from '@/data/models';
import { HttpStatusCodeParams, type HttpClient } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  type SaveSurveyResult,
  type SaveSurveyResultParams,
} from '@/domain/usecases';

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Output>,
  ) {}

  async save(
    input: SaveSurveyResultParams.Input,
  ): Promise<SaveSurveyResultParams.Output> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: input,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return null;
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Output = RemoteSurveyResultModel;
}
