import { FieldValidationSpy } from '@/validation/test';
import { faker } from '@faker-js/faker';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  let fieldValidationSpy: FieldValidationSpy;
  let fieldValidationSpyTwo: FieldValidationSpy;
  let sut: ValidationComposite;
  let fieldName: string;

  beforeAll(() => {
    fieldName = faker.database.column();
    fieldValidationSpy = new FieldValidationSpy(fieldName);
    fieldValidationSpyTwo = new FieldValidationSpy(fieldName);
  });

  beforeEach(() => {
    fieldValidationSpy.error = null;
    fieldValidationSpyTwo.error = null;
    sut = ValidationComposite.build([
      fieldValidationSpy,
      fieldValidationSpyTwo,
    ]);
  });

  it('should return error if any validation fails', () => {
    const errorMessage = faker.word.words();
    fieldValidationSpy.error = new Error(errorMessage);
    fieldValidationSpyTwo.error = new Error(faker.word.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });

    expect(error).toBe(errorMessage);
  });

  it('should return falsy if there is no error', () => {
    const error = sut.validate(fieldName, { [fieldName]: faker.word.sample() });

    expect(error).toBeFalsy();
  });
});
