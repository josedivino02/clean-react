import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';
import { faker } from '@faker-js/faker';

describe('ValidationBuilder', () => {
  let field: string;
  let length: number;

  beforeAll(() => {
    field = faker.database.column();
    length = faker.number.int();
  });

  it('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  it('Should return EmailValidation', () => {
    const validations = ValidationBuilder.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  it('Should return MinLengthValidation', () => {
    const validations = ValidationBuilder.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  it('Should return a list of validations', () => {
    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ]);
  });
});
