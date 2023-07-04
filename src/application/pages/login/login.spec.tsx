import { Login } from '@/application/pages';
import { AuthenticationSpy, Helper, SaveAccessTokenMock, ValidationStub } from '@/application/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

describe('Login Components', () => {
  let sut: RenderResult
  let validationStub: ValidationStub
  let authenticationSpy: AuthenticationSpy
  let history: MemoryHistory
  let saveAccessTokenMock: SaveAccessTokenMock

  beforeEach(() => {
    validationStub = new ValidationStub()
    authenticationSpy = new AuthenticationSpy()
    saveAccessTokenMock = new SaveAccessTokenMock()
    history = createMemoryHistory({ initialEntries: ['/login'] })
    validationStub.errorMessage = faker.word.words()
    sut = render(
      <Router location={''} navigator={history} >
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
          saveAccessToken={saveAccessTokenMock} />
      </Router>
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'email', validationStub.errorMessage)
    Helper.testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show valid email state if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'email')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)
    Helper.testElementExist(sut, 'spinner')
  })

  it('should call Authentication with correct values', async () => {
    validationStub.errorMessage = null

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call Authentication only once', async () => {
    validationStub.errorMessage = null
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    validationStub.errorMessage = null

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit(sut)

    testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call SaveAccessToken on success', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to singup page', async () => {
    validationStub.errorMessage = null

    const register = sut.getByTestId('signup')
    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
