import { faker } from '@faker-js/faker';
import { type GetStorage } from '../protocols/cache';

export class GetStorageSpy implements GetStorage {
  key: string;
  value: any = faker.helpers.arrayElement(['any_data']);

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
