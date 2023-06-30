import { SetStorageSpy } from '@/data/test/mock-storage';
import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  let setStorageSpy: SetStorageSpy;
  let sut: LocalSaveAccessToken;
  let accessToken: string;

  beforeAll(() => {
    accessToken = faker.string.uuid();
  });

  beforeEach(() => {
    setStorageSpy = new SetStorageSpy();
    sut = new LocalSaveAccessToken(setStorageSpy);
  });

  it('Should call SetStorage with correct value', async () => {
    await sut.save(accessToken);

    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
