import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter;
  let key: string;
  let value: string;

  beforeAll(() => {
    key = faker.database.column();
    value = faker.word.words();
  });

  beforeEach(() => {
    sut = new LocalStorageAdapter();

    localStorage.clear();
  });

  it('Should call localStorage with correct values', async () => {
    await sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
