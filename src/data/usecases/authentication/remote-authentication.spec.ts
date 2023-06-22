import { faker } from '@faker-js/faker';
import { AuthenticationParams } from 'domain/usecases/authentication';
import { HttpPostClientSpy } from '../../test/mock-http-client';
import { mockAuthentication } from './../../../domain/test/mock-authentication';
import { RemoteAuthentication } from './remote-authentication';

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
});
