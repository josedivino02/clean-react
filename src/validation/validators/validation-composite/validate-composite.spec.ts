import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '../test/mock-field-validation';

describe('ValidationComposite', () => {
  let fieldValidationSpy: FieldValidationSpy;
  let fieldValidationSpyTwo: FieldValidationSpy;
  let sut: ValidationComposite;

  beforeAll(() => {
    fieldValidationSpy = new FieldValidationSpy('any_field');
    fieldValidationSpyTwo = new FieldValidationSpy('any_field');
    fieldValidationSpy.error = new Error('first_error_message');
    fieldValidationSpyTwo.error = new Error('second_error_message');
  });

  beforeEach(() => {
    sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpyTwo]);
  });

  it('should return error if any validation fails', () => {
    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe('first_error_message');
  });
});
