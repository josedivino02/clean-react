import {
  type HttpGetClient,
  type HttpGetClientParams,
  type HttpPostClient,
  type HttpPostClientParams,
  type HttpResponse,
} from '@/data/protocols/http';
import axios, { type AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostClientParams.Input): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }

  async get(params: HttpGetClientParams.Input): Promise<HttpResponse> {
    const axiosResponse = await axios.get(params.url);

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
