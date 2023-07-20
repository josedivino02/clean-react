import { type HttpGetClientParams } from '@/data/protocols/http';
import { GetStorageSpy, HttpGetClientSpy } from '@/data/test';
import { mockAccountModel } from '@/domain/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { faker } from '@faker-js/faker';

describe('AuthorizeHttpGetClientDecorator', () => {
  let url: string;
  let headers: string;
  let getStorageSpy: GetStorageSpy;
  let sut: AuthorizeHttpGetClientDecorator;
  let httpGetClientSpy: HttpGetClientSpy;

  beforeAll(() => {
    url = faker.internet.url();
    headers = faker.helpers.arrayElement(['any_data']);
    getStorageSpy = new GetStorageSpy();
    httpGetClientSpy = new HttpGetClientSpy();
  });

  beforeEach(() => {
    sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  });

  it('Should call getStorage with correct value', async () => {
    await sut.get({ url, headers });

    expect(getStorageSpy.key).toBe('account');
  });

  it('Should not add headers if getStorage is invalid', async () => {
    const httpRequest: HttpGetClientParams.Input = {
      url,
      headers: {
        field: faker.word.words(),
      },
    };
    await sut.get(httpRequest);

    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  it('Should add headers to HttpGetClient', async () => {
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetClientParams.Input = { url };
    await sut.get(httpRequest);

    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });
});
