import { type GetStorage } from '@/data/protocols/cache';
import {
  type HttpGetClient,
  type HttpGetClientParams,
  type HttpResponse,
} from '@/data/protocols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}

  async get(params: HttpGetClientParams.Input): Promise<HttpResponse> {
    this.getStorage.get('account');
    return null;
  }
}
