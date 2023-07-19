import { GetStorageSpy } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { faker } from '@faker-js/faker';

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call getStorage with correct value', () => {
    const url = faker.internet.url();
    const headers = faker.helpers.arrayElement(['any_data']);
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

    sut.get({ url, headers });

    expect(getStorageSpy.key).toBe('account');
  });
});
