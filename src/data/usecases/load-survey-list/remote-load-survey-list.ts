import { HttpStatusCodeParams, type HttpClient } from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  type LoadSurveyList,
  type LoadSurveyListParams,
} from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Output[]>,
  ) {}

  async loadAll(): Promise<LoadSurveyListParams.Output[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });

    const remoteSurveys = httpResponse.body || [];

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return remoteSurveys.map(remoteSurvey =>
          Object.assign(remoteSurvey, {
            date: new Date(remoteSurvey.date),
          }),
        );
      case HttpStatusCodeParams.OutPut.noContent:
        return [];
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Output = {
    id: string;
    question: string;
    didAnswer: boolean;
    date: string;
  };
}
