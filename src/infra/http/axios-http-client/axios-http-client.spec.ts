import { faker } from '@faker-js/faker';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  let url: string;
  let body: string;
  let sut: AxiosHttpClient;
  let mockedAxiosResult: { data: string; status: number };

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    url = faker.internet.url();
    body = faker.helpers.arrayElement(['any_data']);
    mockedAxiosResult = {
      data: faker.helpers.arrayElement(['any_data']),
      status: faker.number.int(),
    };
    mockedAxios.post.mockResolvedValue(mockedAxiosResult);
  });

  beforeEach(() => {
    sut = new AxiosHttpClient();
  });

  it('Should call axios.post with correct values', async () => {
    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });

  it('Should return correct response on axios.post', async () => {
    const httpResponse = await sut.post({ url, body });

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });

  it('Should return correct error on axios.post', async () => {
    const httpResponse = await sut.post({ url, body });

    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: faker.helpers.arrayElement(['any_data']),
        status: faker.number.int(),
      },
    });

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
