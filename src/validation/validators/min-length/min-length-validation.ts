import { type FieldValidation } from '@/validation/contracts/field-validation';
import { InvalidFieldError } from '@/validation/errors';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  validate(value: string): Error {
    return new InvalidFieldError(this.field);
  }
}
