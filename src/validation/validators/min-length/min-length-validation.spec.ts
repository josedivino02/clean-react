import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';
import { faker } from '@faker-js/faker';

describe('MinLengthValidation', () => {
  let fakerField: string;
  let sut: MinLengthValidation;
  let number: number;

  beforeAll(() => {
    fakerField = faker.database.column();
    number = 5;
  });

  beforeEach(() => {
    sut = new MinLengthValidation(fakerField, number);
  });

  it('should return error if value is invalid', () => {
    const error = sut.validate(faker.string.alphanumeric(3));

    expect(error).toEqual(new InvalidFieldError(fakerField));
  });

  it('should return falsy if value is valid', () => {
    const error = sut.validate(faker.string.alphanumeric(5));

    expect(error).toBeFalsy();
  });
});
