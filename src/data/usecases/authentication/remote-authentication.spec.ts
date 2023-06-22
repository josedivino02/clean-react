import { type HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;

        await Promise.resolve();
      }
    }
    const url = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
