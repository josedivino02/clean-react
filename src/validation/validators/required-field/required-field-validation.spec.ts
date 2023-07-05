import { RequiredFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation;
  let field: string;

  beforeAll(() => {
    field = faker.database.column();
  });

  beforeEach(() => {
    sut = new RequiredFieldValidation(field);
  });

  it('should return error if field is empty', () => {
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return falsy if field is not empty', () => {
    const error = sut.validate({ [field]: faker.word.words() });
    expect(error).toBeFalsy();
  });
});
