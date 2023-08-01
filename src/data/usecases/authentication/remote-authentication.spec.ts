import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import { mockAuthentication, mockAuthenticationModel } from '@/domain/test';

import { type AuthenticationParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication;
  let httpClientSpy: HttpClientSpy<RemoteAuthentication.Output>;
  let url: string;
  let authenticationParams: AuthenticationParams.Input;
  let httpResult: AccountModel;

  beforeAll(() => {
    url = faker.internet.url();
    httpResult = mockAuthenticationModel();
    authenticationParams = mockAuthentication();
  });

  beforeEach(() => {
    httpClientSpy = new HttpClientSpy();
    sut = new RemoteAuthentication(url, httpClientSpy);
  });

  it('Should call HttpClient with correct values', async () => {
    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  });

  it('Should throw  InvalidCredentialError if HttpPostClient return 401', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.unauthorized,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.badRequest,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an AccountModel if HttpPostClient returns 200', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    const account = await sut.auth(authenticationParams);

    expect(account).toEqual(httpResult);
  });
});
