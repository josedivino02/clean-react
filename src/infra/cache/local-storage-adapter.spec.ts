import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter;
  let key: string;
  let value: { accessToken: string; name: string };

  beforeAll(() => {
    key = faker.database.column();
    value = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    };
  });

  beforeEach(() => {
    sut = new LocalStorageAdapter();

    localStorage.clear();
  });

  it('Should call localStorage with correct values', () => {
    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });
});
