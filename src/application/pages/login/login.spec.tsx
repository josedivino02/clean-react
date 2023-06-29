import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, type MemoryHistory } from 'history';
import { AuthenticationSpy, ValidationStub } from '@/application/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react';
import Login from './login';
import 'jest-localstorage-mock';

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Components', () => {
  let sut: RenderResult
  let validationStub: ValidationStub
  let authenticationSpy: AuthenticationSpy
  let history: MemoryHistory

  beforeEach(() => {
    localStorage.clear()
    validationStub = new ValidationStub()
    authenticationSpy = new AuthenticationSpy()
    history = createMemoryHistory()
    validationStub.errorMessage = faker.word.words()
    sut = render(
      <Router location={''} navigator={history} >
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationStub.errorMessage)
    simulateStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show valid email state if Validation succeeds', () => {
    validationStub.errorMessage = null

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    validationStub.errorMessage = null

    populatePasswordField(sut)
    simulateStatusForField(sut, 'email')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    validationStub.errorMessage = null

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    validationStub.errorMessage = null

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication if form is invalid', () => {
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    validationStub.errorMessage = null

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sut)

    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should add accessToken to localstorage on success', async () => {
    validationStub.errorMessage = null

    simulateValidSubmit(sut)

    await waitFor(() => sut.getByTestId('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  it('should go to singup page', async () => {
    validationStub.errorMessage = null

    const register = sut.getByTestId('signup')
    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
