import ApiContext from '@/application/contexts/api/api-context';
import { SignUp } from '@/application/pages';
import { Helper, ValidationStub } from '@/application/test';
import { EmailInUseError } from '@/domain/errors';
import { AddAccountSpy } from '@/domain/test';
import { faker } from '@faker-js/faker';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

const simulateValidSubmit = async (name = faker.person.fullName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Components', () => {
  let validationStub: ValidationStub
  let addAccountSpy: AddAccountSpy
  let history: MemoryHistory
  let setCurrentAccountMock: jest.Mock

  beforeEach(() => {
    validationStub = new ValidationStub()
    addAccountSpy = new AddAccountSpy()
    setCurrentAccountMock = jest.fn()
    validationStub.errorMessage = faker.word.words()
    history = createMemoryHistory({ initialEntries: ['/signup'] })
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={''} navigator={history} >
          <SignUp validation={validationStub} addAccount={addAccountSpy} />
        </Router >
      </ApiContext.Provider>
    )
  })

  it('Should start with initial state', () => {
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()

    Helper.testStatusForField('name', validationStub.errorMessage)
    Helper.testStatusForField('email', validationStub.errorMessage)
    Helper.testStatusForField('password', validationStub.errorMessage)
    Helper.testStatusForField('passwordConfirmation', validationStub.errorMessage)
  })

  it('should show name error if Validation fails', () => {
    Helper.populateField('name')
    Helper.testStatusForField('name', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    Helper.populateField('email')
    Helper.testStatusForField('email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    Helper.populateField('password')
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  it('should show name error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  it('should show email error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show password error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should show passwordConfirmation error if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  it('should call AddAccount with correct values', async () => {
    validationStub.errorMessage = null
    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  it('should call AddAccount only once', async () => {
    validationStub.errorMessage = null
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call AddAccount if form is invalid', async () => {
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should present error if AddAccount fails', async () => {
    validationStub.errorMessage = null

    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  it('should call UpdateCurrentAccount on success', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', async () => {
    validationStub.errorMessage = null

    const loginLink = screen.getByTestId('login')
    fireEvent.click(loginLink)

    expect(history.location.pathname).toBe('/login')
  })
})
