import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { mockSaveSurveyResultParams } from '@/domain/test';
import { type SaveSurveyResultParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';

describe('RemoteSaveSurveyResult', () => {
  let url: string;
  let httpClientSpy: HttpClientSpy;
  let sut: RemoteSaveSurveyResult;
  let saveSurveyResultParams: SaveSurveyResultParams.Input;

  beforeEach(() => {
    url = faker.internet.url();
    saveSurveyResultParams = mockSaveSurveyResultParams();
    httpClientSpy = new HttpClientSpy();
    sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  });

  // it('Should call HttpClient with correct values', async () => {
  //   await sut.save(saveSurveyResultParams);
  //   httpClientSpy.response = {
  //     statusCode: HttpStatusCodeParams.OutPut.ok,
  //     body: saveSurveyResultParams,
  //   };

  //   expect(httpClientSpy.url).toBe(url);
  //   expect(httpClientSpy.method).toBe('put');
  //   expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  // });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.save(saveSurveyResultParams);
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.save(saveSurveyResultParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };
    const promise = sut.save(saveSurveyResultParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return a SurveyResult on 200', async () => {
    const httpResult = mockRemoteSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    const httpResponse = await sut.save(saveSurveyResultParams);

    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    });
  });
});
