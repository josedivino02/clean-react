import {
  HttpStatusCodeParams,
  type HttpGetClient,
} from '@/data/protocols/http';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async load(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeParams.OutPut.ok:
        break;
      case HttpStatusCodeParams.OutPut.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
