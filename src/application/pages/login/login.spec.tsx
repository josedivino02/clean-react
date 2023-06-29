import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import Login from './login'
import { ValidationStub } from '@/application/test'
import { faker } from '@faker-js/faker';

describe('Login Components', () => {
  let sut: RenderResult
  let validationStub: ValidationStub

  beforeEach(() => {
    validationStub = new ValidationStub()
    validationStub.errorMessage = faker.word.words()
    sut = render(<Login validation={validationStub} />)
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if Validation fails', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if Validation fails', () => {
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid password state if Validation succeeds', () => {
    const passwordInput = sut.getByTestId('password')
    validationStub.errorMessage = null
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
