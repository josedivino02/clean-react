import { ApiContext } from '@/application/contexts';
import { Login } from '@/application/pages';
import { AuthenticationSpy, Helper, ValidationStub } from '@/application/test';
import { faker } from '@faker-js/faker';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login Components', () => {
  let validationStub: ValidationStub
  let authenticationSpy: AuthenticationSpy
  let history: MemoryHistory
  let setCurrentAccountMock: jest.Mock

  beforeEach(() => {
    validationStub = new ValidationStub()
    authenticationSpy = new AuthenticationSpy()
    setCurrentAccountMock = jest.fn()
    history = createMemoryHistory({ initialEntries: ['/login'] })
    validationStub.errorMessage = faker.word.words()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={''} navigator={history} >
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
          />
        </Router>
      </ApiContext.Provider>
    )
  })

  it('Should start with initial state', () => {
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)

    Helper.testStatusForField('email', validationStub.errorMessage)
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    Helper.populateField('email')
    Helper.testStatusForField('email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    Helper.populateField('password')
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  it('should show valid email state if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show valid password state if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField('password')
    Helper.testStatusForField('email')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  it('should show spinner on submit', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit()
    Helper.testElementExist('spinner')
  })

  it('should call Authentication with correct values', async () => {
    validationStub.errorMessage = null

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call Authentication only once', async () => {
    validationStub.errorMessage = null
    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should call SaveAccessToken on success', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to singup page', async () => {
    validationStub.errorMessage = null

    const register = screen.getByTestId('signup')
    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
