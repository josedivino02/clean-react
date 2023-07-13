import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { type SurveyModel } from '@/domain/models';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  let url: string;
  let httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
  let sut: RemoteLoadSurveyList;

  beforeEach(() => {
    url = faker.internet.url();
    httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
    sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  });

  it('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw UnexpectedError if HttpGetClient return 403', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
