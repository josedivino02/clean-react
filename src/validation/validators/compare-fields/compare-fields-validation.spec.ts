import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from './compare-fields-validation';

describe('CompareFieldsValidation', () => {
  let sut: CompareFieldsValidation;
  let field: string;
  let fieldToCompare: string;

  beforeEach(() => {
    field = faker.database.column();
    fieldToCompare = faker.word.words();
    sut = new CompareFieldsValidation(field, fieldToCompare);
  });

  it('should return error if field is empty', () => {
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value',
    });
    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if field is not empty', () => {
    const value = faker.word.words();

    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
