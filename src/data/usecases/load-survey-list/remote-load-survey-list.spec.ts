import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  let url: string;
  let httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Output[]>;
  let sut: RemoteLoadSurveyList;

  beforeEach(() => {
    url = faker.internet.url();
    httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Output[]>();
    sut = new RemoteLoadSurveyList(url, httpClientSpy);
  });

  it('should call HttpClient with correct URL and method', async () => {
    await sut.loadAll();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a list of SurveyModels if HttpClient return 200', async () => {
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    const surveyList = await sut.loadAll();

    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        didAnswer: httpResult[0].didAnswer,
        date: new Date(httpResult[0].date),
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        didAnswer: httpResult[1].didAnswer,
        date: new Date(httpResult[1].date),
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        didAnswer: httpResult[2].didAnswer,
        date: new Date(httpResult[2].date),
      },
    ]);
  });

  it('Should return an empty list if HttpClient returns 204', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.noContent,
    };

    const surveyList = await sut.loadAll();

    expect(surveyList).toEqual([]);
  });
});
