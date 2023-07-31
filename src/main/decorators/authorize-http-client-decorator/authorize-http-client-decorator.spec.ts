import { type HttpRequest } from '@/data/protocols/http';
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from '@/data/test';
import { mockAccountModel } from '@/domain/test';
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator/authorize-http-client-decorator';
import faker from 'faker';

describe('AuthorizeHttpGetClientDecorator', () => {
  let url: string;
  let getStorageSpy: GetStorageSpy;
  let sut: AuthorizeHttpClientDecorator;
  let httpClientSpy: HttpClientSpy;

  beforeAll(() => {
    url = faker.internet.url();
    getStorageSpy = new GetStorageSpy();
    httpClientSpy = new HttpClientSpy();
  });

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  });

  it('Should call getStorage with correct value', async () => {
    await sut.request(mockHttpRequest());

    expect(getStorageSpy.key).toBe('account');
  });

  it('Should not add headers if getStorage is invalid', async () => {
    const httpRequest: HttpRequest.Input = {
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      url,
      headers: {
        field: faker.random.objectElement(),
      },
    };
    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  it('Should add headers to HttpClient', async () => {
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpRequest.Input = {
      url,
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
    };
    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('Should merge headers to HttpClient', async () => {
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.objectElement();
    const httpRequest: HttpRequest.Input = {
      url,
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: { field },
    };
    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('Should return the same result as HttpClient', async () => {
    const httpResponse = await sut.request(mockHttpRequest());

    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
