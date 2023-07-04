import { SignUp } from '@/application/pages';
import { Helper, ValidationStub } from '@/application/test';
import { faker } from '@faker-js/faker';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import React from 'react';

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
    Helper.testStatusForField(sut, 'email', validationStub.errorMessage)
    Helper.testStatusForField(sut, 'password', validationStub.errorMessage)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationStub.errorMessage)
  })

  it('should show name error if Validation fails', () => {
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show name error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('should show email error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show password error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should show passwordConfirmation error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
})
