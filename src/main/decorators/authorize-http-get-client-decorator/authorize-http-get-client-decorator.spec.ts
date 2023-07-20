import { GetStorageSpy } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { faker } from '@faker-js/faker';

describe('AuthorizeHttpGetClientDecorator', () => {
  let url: string;
  let headers: string;
  let getStorageSpy: GetStorageSpy;
  let sut: AuthorizeHttpGetClientDecorator;

  beforeAll(() => {
    url = faker.internet.url();
    headers = faker.helpers.arrayElement(['any_data']);
    getStorageSpy = new GetStorageSpy();
  });

  beforeEach(() => {
    sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
  });

  it('Should call getStorage with correct value', () => {
    sut.get({ url, headers });

    expect(getStorageSpy.key).toBe('account');
  });
});
