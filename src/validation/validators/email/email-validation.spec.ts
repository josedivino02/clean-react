import { EmailValidation } from './email-validation';
import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.word.words());

    const error = sut.validate(faker.word.words());
    expect(error).toEqual(new InvalidFieldError());
  });

  it('should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.word.words());

    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
