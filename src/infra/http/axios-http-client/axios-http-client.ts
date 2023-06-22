import { type HttpPostClientParams } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post(params: HttpPostClientParams.Input<any>): Promise<void> {
    await axios(params.url);
  }
}
