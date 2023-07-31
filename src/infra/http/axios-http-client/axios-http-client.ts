import {
  type HttpClient,
  type HttpRequest,
  type HttpResponse,
} from '@/data/protocols/http';
import axios, { type AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    body,
    method,
    headers,
  }: HttpRequest.Input): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url,
        data: body,
        headers,
        method,
      });
    } catch (error) {
      axiosResponse = error.response;
    }

    return this.adapt(axiosResponse);
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
