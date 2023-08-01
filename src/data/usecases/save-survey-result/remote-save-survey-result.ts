import { type RemoteSurveyResultModel } from '@/data/models';
import { type HttpClient } from '@/data/protocols/http';
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
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: input,
    });

    return null;
  }
}

export namespace RemoteSaveSurveyResult {
  export type Output = RemoteSurveyResultModel;
}
