import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { AccessDeniedError } from '@/domain/errors';
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

  it('Should call HttpClient with correct values', async () => {
    await sut.save(saveSurveyResultParams);
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: saveSurveyResultParams,
    };

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  });

  it('Should throw AccessDeniedError if HttpClient return 403', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.save(saveSurveyResultParams);
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });
});
