import {
  HttpStatusCodeParams,
  type HttpGetClient,
} from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import {
  type LoadSurveyList,
  type LoadSurveyListParams,
} from '@/domain/usecases';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<
      RemoteLoadSurveyList.Output[]
    >,
  ) {}

  async loadAll(): Promise<LoadSurveyListParams.Output[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

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
