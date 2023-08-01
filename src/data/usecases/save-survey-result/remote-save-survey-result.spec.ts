import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { faker } from '@faker-js/faker';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';

describe('RemoteSaveSurveyResult', () => {
  let url: string;
  let httpClientSpy: HttpClientSpy;
  let sut: RemoteSaveSurveyResult;
  let httpResult: RemoteSaveSurveyResult.Output;

  beforeEach(() => {
    url = faker.internet.url();
    httpResult = mockRemoteSurveyResultModel();
    httpClientSpy = new HttpClientSpy();
    sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  });

  it('Should call HttpClient with correct url and method', async () => {
    await sut.save({ answer: faker.word.words() });
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
  });
});
