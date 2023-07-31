import { mockHttpRequest } from '@/data/test';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import type axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient;
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = mockAxios();

    sut = new AxiosHttpClient();
  });

  describe('AxiosHttpClient', () => {
    it('Should call axios with correct values', async () => {
      const request = mockHttpRequest();
      await sut.request(request);

      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        data: request.body,
        headers: request.headers,
        method: request.method,
      });
    });

    it('Should return correct response', async () => {
      const httpResponse = await sut.request(mockHttpResponse());
      const axiosResponse = await mockedAxios.request.mock.results[0].value;

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    it('Should return correct error', () => {
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const promise = sut.request(mockHttpResponse());
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
    });
  });
});
