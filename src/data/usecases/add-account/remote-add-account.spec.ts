import { HttpStatusCodeParams } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { type AccountModel } from '@/domain/models';
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/test';
import { type AddAccountParams } from '@/domain/usecases';
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';

describe('RemoteAddAccount', () => {
  let sut: RemoteAddAccount;
  let url: string;
  let httpClientSpy: HttpClientSpy<RemoteAddAccount.Output>;
  let httpResult: AccountModel;
  let addAccountParams: AddAccountParams.Input;

  beforeAll(() => {
    httpResult = mockAddAccountModel();
    url = faker.internet.url();
    httpClientSpy = new HttpClientSpy();
    addAccountParams = mockAddAccountParams();
  });

  beforeEach(() => {
    sut = new RemoteAddAccount(url, httpClientSpy);
  });

  it('Should call HttpClient with correct values', async () => {
    await sut.add(addAccountParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  it('Should throw EmailInUseError if HttpPostClient return 403', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.forbidden,
    };

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.badRequest,
    };

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.serverError,
    };

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.notFound,
    };

    const promise = sut.add(addAccountParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return an AccountModel if HttpPostClient returns 200', async () => {
    httpClientSpy.response = {
      statusCode: HttpStatusCodeParams.OutPut.ok,
      body: httpResult,
    };

    const account = await sut.add(addAccountParams);

    expect(account).toEqual(httpResult);
  });
});
