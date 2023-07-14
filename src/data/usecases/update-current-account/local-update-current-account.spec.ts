import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { LocalUpdateCurrentAccount } from './local-update-current-account';

describe('LocalUpdateCurrentAccount', () => {
  let setStorageMock: SetStorageMock;
  let sut: LocalUpdateCurrentAccount;
  let account: AccountModel;

  beforeAll(() => {
    account = mockAccountModel();
  });

  beforeEach(() => {
    setStorageMock = new SetStorageMock();
    sut = new LocalUpdateCurrentAccount(setStorageMock);
  });

  it('Should call SetStorage with correct value', async () => {
    await sut.save(account);

    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  it('Should throw if SetStorage throws', async () => {
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(account);

    await expect(promise).rejects.toThrow(new Error());
  });

  it('Should throw if account is falsy', async () => {
    const promise = sut.save(undefined);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
