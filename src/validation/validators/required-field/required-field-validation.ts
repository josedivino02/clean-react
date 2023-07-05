import { type FieldValidation } from '@/validation/contracts/field-validation';
import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
