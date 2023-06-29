import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import React from 'react'
import Login from './login'
import { ValidationSpy } from '@/application/test'

describe('Login Components', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy

  beforeEach(() => {
    validationSpy = new ValidationSpy()
    sut = render(<Login validation={validationSpy} />)
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call Validation with correct email', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  it('should call Validation with correct password', () => {
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
