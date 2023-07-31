import { faker } from '@faker-js/faker';
import axios from 'axios';

export const mockHttpResponse = (): any => ({
  data: faker.helpers.arrayElement(['any_data']),
  status: faker.number.int(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
