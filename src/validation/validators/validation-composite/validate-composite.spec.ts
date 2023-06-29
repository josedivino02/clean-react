import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '../test/mock-field-validation';

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field');
    const fieldValidationSpyTwo = new FieldValidationSpy('any_field');
    fieldValidationSpyTwo.error = new Error('any_error_message');
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpyTwo,
    ]);

    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe('any_error_message');
  });
});
