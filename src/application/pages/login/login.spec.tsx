import { Login } from '@/application/pages';
import { AuthenticationSpy, ValidationStub } from '@/application/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { cleanup, fireEvent, render, waitFor, type RenderResult } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import 'jest-localstorage-mock';
import React from 'react';
import { Router } from 'react-router-dom';

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExist = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
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
    history = createMemoryHistory({ initialEntries: ['/login'] })
    validationStub.errorMessage = faker.word.words()
    sut = render(
      <Router location={''} navigator={history} >
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)

    testStatusForField(sut, 'email', validationStub.errorMessage)
    testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show email error if Validation fails', () => {
    populateEmailField(sut)
    testStatusForField(sut, 'email', validationStub.errorMessage)
  })

  it('should show password error if Validation fails', () => {
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationStub.errorMessage)
  })

  it('should show valid email state if Validation succeeds', () => {
    validationStub.errorMessage = null

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    validationStub.errorMessage = null

    populatePasswordField(sut)
    testStatusForField(sut, 'email')
  })

  it('should enable submit button if form is valid', () => {
    validationStub.errorMessage = null

    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)
    testElementExist(sut, 'spinner')
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
    testErrorWrapChildCount(sut, 1)
  })

  it('should add accessToken to localstorage on success', async () => {
    validationStub.errorMessage = null

    await simulateValidSubmit(sut)

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to singup page', async () => {
    validationStub.errorMessage = null

    const register = sut.getByTestId('signup')
    fireEvent.click(register)

    expect(history.location.pathname).toBe('/signup')
  })
})
