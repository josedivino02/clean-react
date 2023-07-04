import { HttpPostClientSpy } from '@/data/test';
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
});
