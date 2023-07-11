import {
  type HttpPostClient,
  type HttpPostClientParams,
  type HttpResponse,
} from '@/data/protocols/http';
import axios, { type AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostClientParams.Input): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
