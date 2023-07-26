import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

describe('RemoteLoadSurveyResult', () => {
  let url: string;
  let httpGetClientSpy: HttpGetClientSpy;
  let sut: RemoteLoadSurveyResult;

  beforeAll(() => {
    url = faker.internet.url();
  });

  beforeEach(() => {
    httpGetClientSpy = new HttpGetClientSpy();
    sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  });

  it('Should call HttpGetClient with correct url', async () => {
    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw AccessDeniedError if HttpGetClient return 403', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  it('Should throw UnexpectedError if HttpGetClient return 404', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpGetClient return 500', async () => {
    httpGetClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.load();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
