import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailInUseError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import { mockAddAccountParams } from '@/domain/test';
import { type AddAccountParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';

describe('RemoteAddAccount', () => {
  let sut: RemoteAddAccount;
  let url: string;
  let httpPostClientSpy: HttpPostClientSpy<
  AddAccountParams.Input,
  AccountModel
  >;
  let addAccountParams: AddAccountParams.Input;

  beforeAll(() => {
    url = faker.internet.url();
    httpPostClientSpy = new HttpPostClientSpy();
    addAccountParams = mockAddAccountParams();
  });

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpPostClientSpy);
  });

  it('Should call HttpClient with correct URL', async () => {
    await sut.add(addAccountParams);

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpClient with correct body', async () => {
    await sut.add(addAccountParams);

    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  it('Should throw EmailInUseError if HttpPostClient return 403', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
});
