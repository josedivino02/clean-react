import { HttpStatusCodeParams } from '@/data/protocols/http/http-response';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { faker } from '@faker-js/faker';
import { AuthenticationParams } from 'domain/usecases/authentication';

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication;
  let httpPostClientSpy: HttpPostClientSpy;
  let url: string;
  let authenticationParams: AuthenticationParams.Input;

  beforeAll(() => {
    url = faker.internet.url();
    authenticationParams = mockAuthentication();
  });

  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication(url, httpPostClientSpy);
  });

  it('Should call HttpClient with correct URL', async () => {
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpClient with correct body', async () => {
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it('Should throw  InvalidCredentialError if HttpPostClient return 401', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.unauthorized,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('Should throw  UnexpectedError if HttpPostClient return 400', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.badRequest,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw  UnexpectedError if HttpPostClient return 500', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw  UnexpectedError if HttpPostClient return 405', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
