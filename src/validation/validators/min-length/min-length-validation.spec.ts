import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

describe('MinLengthValidation', () => {
  let field: string;
  let sut: MinLengthValidation;
  let number: number;

  beforeAll(() => {
    field = faker.database.column();
    number = 5;
  });

  beforeEach(() => {
    sut = new MinLengthValidation(field, number);
  });

  it('should return error if value is invalid', () => {
    const error = sut.validate({ [field]: faker.string.alphanumeric(3) });

    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if value is valid', () => {
    const error = sut.validate({ [field]: faker.string.alphanumeric(5) });

    expect(error).toBeFalsy();
  });

  it('should return falsy if field does not exists in schema', () => {
    const error = sut.validate({
      [faker.database.column()]: faker.string.alphanumeric(5),
    });

    expect(error).toBeFalsy();
  });
});
