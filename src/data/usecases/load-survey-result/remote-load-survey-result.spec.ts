import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

describe('RemoteLoadSurveyResult', () => {
  let url: string;
  let httpClientSpy: HttpClientSpy;
  let sut: RemoteLoadSurveyResult;
  let httpResult: RemoteLoadSurveyResult.Output;

  beforeEach(() => {
    url = faker.internet.url();
    httpResult = mockRemoteSurveyResultModel();
    httpClientSpy = new HttpClientSpy();
    sut = new RemoteLoadSurveyResult(url, httpClientSpy);
  });

  // it('Should call HttpClient with correct url and method', async () => {
  //   await sut.load();
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCodeParams.OutPut.ok,
  //     body: httpResult,
  //   };

  //   expect(httpClientSpy.url).toBe(url);
  //   expect(httpClientSpy.method).toBe('get');
  // });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a SurveyResult on 200', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    const httpResponse = await sut.load();

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    });
  });
});
