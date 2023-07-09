import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  let setStorageMock: SetStorageMock;
  let sut: LocalSaveAccessToken;
  let accessToken: string;

  beforeAll(() => {
    accessToken = faker.string.uuid();
  });

  beforeEach(() => {
    setStorageMock = new SetStorageMock();
    sut = new LocalSaveAccessToken(setStorageMock);
  });

  it('Should call SetStorage with correct value', async () => {
    await sut.save(accessToken);

    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  it('Should throw if SetStorage throws', async () => {
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(accessToken);

    await expect(promise).rejects.toThrow(new Error());
  });

  it('Should throw if accessToken is falsy', async () => {
    const promise = sut.save(undefined);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
