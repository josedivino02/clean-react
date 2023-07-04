import { SignUp } from '@/application/pages';
import { AddAccountSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/application/test';
import { EmailInUseError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

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
  let history: MemoryHistory
  let saveAccessTokenMock: SaveAccessTokenMock

  beforeEach(() => {
    validationStub = new ValidationStub()
    addAccountSpy = new AddAccountSpy()
    saveAccessTokenMock = new SaveAccessTokenMock()
    validationStub.errorMessage = faker.word.words()
    history = createMemoryHistory({ initialEntries: ['/signup'] })
    sut = render(
      <Router location={''} navigator={history} >
        <SignUp validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
      </Router >
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

  it('should call AddAccount only once', async () => {
    validationStub.errorMessage = null
    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call AddAccount if form is invalid', async () => {
    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should present error if AddAccount fails', async () => {
    validationStub.errorMessage = null

    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call SaveAccessToken on success', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', async () => {
    validationStub.errorMessage = null

    const loginLink = sut.getByTestId('login')
    fireEvent.click(loginLink)

    expect(history.location.pathname).toBe('/login')
  })
})
