import { type FieldValidation } from '@/validation/contracts/field-validation';
import { InvalidFieldError } from '@/validation/errors';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError(this.field);
  }
}
