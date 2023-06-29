import { EmailValidation } from './email-validation';
import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';

describe('EmailValidation', () => {
  let fakerField: string;
  let sut: EmailValidation;

  beforeAll(() => {
    fakerField = faker.database.column();
  });

  beforeEach(() => {
    sut = new EmailValidation(fakerField);
  });

  it('should return error if email is invalid', () => {
    const error = sut.validate(faker.word.words());
    expect(error).toEqual(new InvalidFieldError(fakerField));
  });

  it('should return falsy if email is valid', () => {
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const error = sut.validate('');
    expect(error).toBeFalsy();
  });
});
