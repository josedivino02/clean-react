import { SignUp } from '@/application/pages';
import { AddAccountSpy, Helper, ValidationStub } from '@/application/test';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react';
import React from 'react';

const simulateValidSubmit = async (sut: RenderResult, name = faker.person.fullName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Components', () => {
  let sut: RenderResult
  let validationStub: ValidationStub
  let addAccountSpy: AddAccountSpy

  beforeAll(() => {
    validationStub = new ValidationStub()
    addAccountSpy = new AddAccountSpy()
    validationStub.errorMessage = faker.word.words()
  })

  beforeEach(() => {
    sut = render(
      <SignUp validation={validationStub} addAccount={addAccountSpy} />
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

  it('should show spinner on submit', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)
    Helper.testElementExist(sut, 'spinner')
  })

  it('should call AddAccount with correct values', async () => {
    validationStub.errorMessage = null
    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })
})
