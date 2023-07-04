import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from './compare-fields-validation';

describe('CompareFieldsValidation', () => {
  let sut: CompareFieldsValidation;
  let field: string;
  let valueToCompare: string;

  beforeEach(() => {
    field = faker.database.column();
    valueToCompare = faker.word.words();
    sut = new CompareFieldsValidation(field, valueToCompare);
  });

  it('should return error if field is empty', () => {
    const error = sut.validate(faker.word.words());
    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if field is not empty', () => {
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
