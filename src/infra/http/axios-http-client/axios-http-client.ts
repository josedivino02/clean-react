import {
  type HttpPostClient,
  type HttpResponse,
  type HttpPostClientParams,
} from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(
    params: HttpPostClientParams.Input<any>,
  ): Promise<HttpResponse<any>> {
    const { status, data } = await axios.post(params.url, params.body);

    return {
      statusCode: status,
      body: data,
    };
  }
}
