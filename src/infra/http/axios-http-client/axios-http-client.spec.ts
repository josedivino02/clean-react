import { faker } from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let url: string;
  let sut: AxiosHttpClient;

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    url = faker.internet.url();
  });

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('Should call axios with correct URL', async () => {
    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
