import {
  HttpStatusCodeParams,
  type HttpGetClient,
} from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import {
  type LoadSurveyResult,
  type LoadSurveyResultParams,
} from '@/domain/usecases';

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Output>,
  ) {}

  async load(): Promise<LoadSurveyResultParams.Output> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveyResult = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        return Object.assign(remoteSurveyResult, {
          date: new Date(remoteSurveyResult.date),
        });
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Output = {
    question: string;
    date: string;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
  };
}