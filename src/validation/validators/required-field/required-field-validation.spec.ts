import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';
import { faker } from '@faker-js/faker';

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation;

  beforeEach(() => {
    sut = new RequiredFieldValidation(faker.database.column());
  });

  it('should return error if field is empty', () => {
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return falsy if field is not empty', () => {
    const error = sut.validate(faker.word.words());
    expect(error).toBeFalsy();
  });
});
