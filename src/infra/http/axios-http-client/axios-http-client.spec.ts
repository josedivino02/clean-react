import { faker } from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let url: string;
  let body: string;
  let sut: AxiosHttpClient;

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    url = faker.internet.url();
    body = faker.helpers.arrayElement(['any_data']);
  });

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('Should call axios with correct values', async () => {
    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });
});
