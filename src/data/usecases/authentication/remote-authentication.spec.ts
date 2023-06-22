import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  let sut: RemoteAuthentication;
  let httpPostClientSpy: HttpPostClientSpy;
  let url: string;

  beforeAll(() => {
    url = 'any_url';
  });

  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy();
    sut = new RemoteAuthentication(url, httpPostClientSpy);
  });

  it('Should call HttpClient with correct URL', async () => {
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
