import {
  EmailValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();

    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });

  it('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build();

    expect(validations).toEqual([new EmailValidation('any_field')]);
  });
});
