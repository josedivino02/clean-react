import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  let url: string;
  let httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Output[]>;
  let sut: RemoteLoadSurveyList;

  beforeEach(() => {
    url = faker.internet.url();
    httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Output[]>();
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

  it('Should throw UnexpectedError if HttpGetClient return 404', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpGetClient return 500', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a list of SurveyModels if HttpGetClient return 200', async () => {
    const httpResult = mockRemoteSurveyListModel();
    httpGetClientSpy.response = {
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

  it('Should return an empty list if HttpGetClient returns 204', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.noContent,
    };

    const surveyList = await sut.loadAll();

    expect(surveyList).toEqual([]);
  });
});
