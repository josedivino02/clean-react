import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter;
  let key: string;
  let value: { accessToken: string; name: string };

  beforeEach(() => {
    key = faker.database.column();
    value = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    };
    sut = new LocalStorageAdapter();

    localStorage.clear();
  });

  it('Should call localStorage.setItem with correct values', () => {
    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it('Should call localStorage.removeItem if value is null', () => {
    sut.set(key, undefined);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('Should call localStorage.getItem with correct value', () => {
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
