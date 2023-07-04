import { SignUp } from '@/application/pages';
import { Helper, ValidationStub } from '@/application/test';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import React from 'react';

const populateField = (sut: RenderResult, fieldName: string, value = faker.word.words()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Components', () => {
  let sut: RenderResult
  let validationStub: ValidationStub

  beforeAll(() => {
    validationStub = new ValidationStub()
    validationStub.errorMessage = faker.word.words()
  })

  beforeEach(() => {
    sut = render(
      <SignUp validation={validationStub} />
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'name', validationStub.errorMessage)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  it('should show name error if Validation fails', () => {
    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationStub.errorMessage)
  })
})
