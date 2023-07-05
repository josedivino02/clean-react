import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  let sut: EmailValidation;
  let field: string;

  beforeEach(() => {
    field = faker.database.column();
    sut = new EmailValidation(field);
  });

  it('should return error if email is invalid', () => {
    const error = sut.validate({ [field]: faker.word.words() });
    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if email is valid', () => {
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
